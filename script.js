// Load D3.js
var script = document.createElement('script');
script.src = 'https://d3js.org/d3.v7.min.js';
script.onload = function() {
    // Check if datasets are loaded correctly
    var datasets = window.datasets;
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

    // Function to render table
    function renderTable(filteredData) {
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
            .data(filteredData)
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
            .text(d => {
                console.log("Appending cell with data:", d); // Debug each cell data
                return d;
            });

        console.log("Table rendered with data:", filteredData);
    }

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
};
document.head.appendChild(script);
