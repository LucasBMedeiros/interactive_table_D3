window.datasets = [
    {
        "Incident ID": "INC999944494949",
        "day": "2024-05-22",
        "Color": "YELLOW",
        "Business Impact": "text with the description of the impact",
        "Cause": "specific cause",
        "Impacted Apps": "specific app",
        "Impacted Clients": "INSTAGRAM"
    },
    {
        "Incident ID": "INC855757585858",
        "day": "2024-05-23",
        "Color": "BLUE",
        "Business Impact": "text with the description of the impact",
        "Cause": "specific cause",
        "Impacted Apps": "specific app",
        "Impacted Clients": "WHATSAPP"
    },
    {
        "Incident ID": "INC855757582239",
        "day": "2024-05-24",
        "Color": "BLUE",
        "Business Impact": "text with the description of the impact",
        "Cause": "specific cause",
        "Impacted Apps": "specific app",
        "Impacted Clients": "FACEBOOK, INSTAGRAM, WHATSAPP, TELEGRAM"
    }
];

// The rest of your script.js code

// Assuming window.datasets is an array of objects with the new structure
var data = window.datasets.map(d => ({
    "Incident ID": d["Incident ID"],
    "day": new Date(d.day), // Convert day to a Date object
    "Color": d.Color,
    "Business Impact": d["Business Impact"],
    "Cause": d.Cause,
    "Impacted Apps": d["Impacted Apps"],
    "Impacted Clients": d["Impacted Clients"]
}));

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
        .data(["Incident ID", "Day", "Color", "Business Impact", "Cause", "Impacted Apps", "Impacted Clients"])
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
            d.day.toLocaleDateString(), // Format the date
            d.Color,
            d["Business Impact"],
            d.Cause,
            d["Impacted Apps"],
            d["Impacted Clients"]
        ])
        .enter()
        .append("td")
        .text(d => d);
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
