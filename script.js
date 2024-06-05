// Load D3.js
var script = document.createElement('script');
script.src = 'https://d3js.org/d3.v7.min.js';
script.onload = function() {
    // Assuming window.datasets is already available in Domo environment
    var data = window.datasets.map(d => {
        // Attempt to convert the date to a valid JavaScript Date object
        let parsedDate = new Date(d.Date);
        if (isNaN(parsedDate)) {
            // If the direct conversion fails, try parsing it as a string
            parsedDate = new Date(Date.parse(d.Date));
        }

        return {
            "Incident ID": d["Incident ID"],
            "Color": d.Color,
            "Cause": d.Cause,
            "Date": parsedDate, // Use the parsed date
            "Business Impact": d["Business Impact"],
            "Impacted Apps": d["Impacted Apps"],
            "Impacted Clients": d["Impacted Clients"]
        };
    });

    console.log("Data after parsing:", data);

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
                d.Date instanceof Date && !isNaN(d.Date) ? d.Date.toLocaleDateString() : "Invalid Date",
                d["Business Impact"],
                d["Impacted Apps"],
                d["Impacted Clients"]
            ])
            .enter()
            .append("td")
            .text(d => d);

        console.log("Table rendered with data:", filteredData);
    }

    // Initial rendering
    renderTable(data);

    // Filter function
    function filterData() {
        const filterValue = document.getElementById("filter-input").value.toLowerCase();
        const filteredData = data.filter(d => d["Impacted Clients"].toLowerCase().includes(filterValue));
        renderTable(filteredData);
    }

    // Event listener for the filter button
    document.getElementById("filter-button").addEventListener("click", filterData);
};
document.head.appendChild(script);
