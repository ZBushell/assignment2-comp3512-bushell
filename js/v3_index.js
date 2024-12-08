
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

    // Example: Build race table
    console.log("Building rTbl with", rTbl);
    console.log("Building qTbl with", qTbl);
    console.log("Building eTbl with", eTbl);
    // Implement detailed table-building logic as needed
}

// Main function to fetch and use data
async function main(year) {
    const data = await fetchAndStoreData(year);
    buildTables(data);
}

// Example invocation
main(2023);
