// Load D3.js
var script = document.createElement('script');
script.src = 'https://d3js.org/d3.v7.min.js';
script.onload = function() {
    // Function to render table
    function renderTable(data) {
        const container = d3.select("#table-container");
        container.selectAll("table").remove();

        const table = container.append("table");
        const thead = table.append("thead");
        const tbody = table.append("tbody");

        // Append header row
        thead.append("tr")
            .selectAll("th")
            .data(["Incident ID", "Color", "Cause", "Date", "Business Impact", "Impacted Apps", "Impacted Clients"])
            .enter()
            .append("th")
            .text(d => d);

        // Append rows
        const rows = tbody.selectAll("tr")
            .data(data)
            .enter()
            .append("tr");

        // Append cells
        rows.selectAll("td")
            .data(d => [
                d["Incident ID"],
                d.Color,
                d.Cause,
                new Date(d.Date).toLocaleDateString(), // Format the date
                d["Business Impact"],
                d["Impacted Apps"],
                d["Impacted Clients"]
            ])
            .enter()
            .append("td")
            .text(d => d);

        console.log("Table rendered with data:", data);
    }

    // Function to fetch and process data
    function fetchDataAndRenderTable() {
        domo.get('/data/v1/tableName')  // Replace 'tableName' with your actual table name or ID
            .then(datasets => {
                // Verify datasets are loaded correctly
                console.log("Initial datasets:", datasets);

                // Ensure datasets is an array and has the expected structure
                if (!Array.isArray(datasets) || datasets.length === 0) {
                    console.error("Datasets is not an array or is empty");
                    return;
                }

                // Log the structure of the first dataset item for verification
                console.log("First dataset item structure:", datasets[0]);

                // Map the data to the desired structure
                var data = datasets.map(d => ({
                    "Incident ID": d["Incident ID"],
                    "Color": d.Color,
                    "Cause": d.Cause,
                    "Date": d.Date, // Assuming Date is already in date type
                    "Business Impact": d["Business Impact"],
                    "Impacted Apps": d["Impacted Apps"],
                    "Impacted Clients": d["Impacted Clients"]
                }));

                console.log("Data after mapping:", data);

                // Initial rendering with full data
                renderTable(data);

                // Filter function
                function filterData() {
                    const filterValue = document.getElementById("filter-input").value.toLowerCase();
                    const filteredData = data.filter(d => d["Impacted Clients"].toLowerCase().includes(filterValue));
                    console.log("Filtered data:", filteredData); // Log filtered data
                    renderTable(filteredData);
                }

                // Event listener for the filter button
                document.getElementById("filter-button").addEventListener("click", filterData);
            })
            .catch(error => {
                console.error("Error fetching data from Domo:", error);
            });
    }

    // Fetch data and render table on load
    fetchDataAndRenderTable();
};
document.head.appendChild(script);

