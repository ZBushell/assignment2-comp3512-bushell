
const URLS = {
    rTbl: "https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=",
    qTbl: "https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season=",
    eTbl: "https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?season="
};

// Helper functions for local storage
function getLocalCopy(key) {
    const data = localStorage.getItem(key);
    try {
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.dir(error);
        throw error;
    }
}

function saveLocalCopy(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Fetch API data for a single table
async function fetchTableData(url, year) {
    try {
        const response = await fetch(url + year);
        return await response.json();
    } catch (error) {
        console.dir(error);
        throw error;
    }
}

// Fetch and store rTbl, qTbl, and eTbl data separately
async function fetchAndStoreData(year) {
    const rTbl = getLocalCopy('rTbl') || await fetchTableData(URLS.rTbl, year);
    const qTbl = getLocalCopy('qTbl') || await fetchTableData(URLS.qTbl, year);
    const eTbl = getLocalCopy('eTbl') || await fetchTableData(URLS.eTbl, year);

    // Save to local storage
    saveLocalCopy('rTbl', rTbl);
    saveLocalCopy('qTbl', qTbl);
    saveLocalCopy('eTbl', eTbl);

    return { rTbl, qTbl, eTbl };
}

// Table building logic using separate data
function buildTables(data) {
    const { rTbl, qTbl, eTbl } = data;


}

// Example usage inside the main function
async function main(year) {
    const data = await fetchAndStoreData(year);
    buildDomTables(data);
}

// Function to create and populate a table dynamically
function createTable(data, containerId, title) {
    // Find the container element
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found.`);
        return;
    }

    // Create a table element
    const table = document.createElement('table');
    table.classList.add('data-table');

    // Create and append a title row
    if (title) {
        const caption = document.createElement('caption');
        caption.textContent = title;
        table.appendChild(caption);
    }

    // Add table headers
    const thead = document.createElement('thead');
    const headers = Object.keys(data[0]); // Use keys from the first object as headers
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Add table rows
    const tbody = document.createElement('tbody');
    data.forEach(row => {
        const tableRow = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header];
            tableRow.appendChild(td);
        });
        tbody.appendChild(tableRow);
    });
    table.appendChild(tbody);

    // Clear the container and append the table
    container.innerHTML = ''; // Clear previous content if any
    container.appendChild(table);
}

//
document.addEventListener("DOMContentLoaded", function(){

});

