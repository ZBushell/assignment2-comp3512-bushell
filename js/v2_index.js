
const URLS = [
    "https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=",
    "https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season=",
    "https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?season="
    
    ];

 //helper function for get data
 function getLocalCopy(key) {
    const data = localStorage.getItem(key);
    try {
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.dir(error);
        throw error;
    }
}


//does what it's named
function saveLocalCopy(key, data){

    localStorage.setItem(key, JSON.stringify(data));
}


// Fetch API data
async function getAPIData(url, year) {
    try {
        const response = await fetch(url + year);
        return await response.json();
        
     } catch (error) {
         console.dir(error);
         throw error;
     }
}

//gets data from promises and returns something useful. 
//also stores data locally if not there already.
async function getSeasonData(urls, year) {
    const cacheKey = `${year}-data`;
    const cachedData = getLocalCopy(cacheKey);

    if (cachedData) {
        // Parse the cached stringified JSON
        return JSON.parse(cachedData);
    }

    try {
        const [rTbl, qTbl, eTbl] = await Promise.all(urls.map(url => getAPIData(url, year)));
        const seasonData = { rTbl, qTbl, eTbl };

        // Store the stringified version of seasonData
        saveLocalCopy(cacheKey, seasonData);

        return seasonData;
    } catch (error) {
        console.error("Error fetching season data:", error);
        throw error;
    }
}



//extracted race table logic
//refactored to be better than my quereySelector gore
function populateRaceTable(rTbl, container){
    container.innerHTML = ""; // Clear any existing rows
    rTbl.forEach(race => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${race.round}</td>
            <td>${race.name}</td>
            <td><button data-round="${race.round}">Results</button></td>
        `;
        container.appendChild(row);
    });
}

function filterAndPopulateData(round, qTbl, eTbl, qualiContainer, resultContainer, podium) {
    const qualifyingData = filterDataByRound(qTbl, round);
    const resultData = filterDataByRound(eTbl, round);
    console.dir(resultData);
   

    // Populate qualifying table
    qualiContainer.innerHTML = "";
    qualifyingData.forEach(q => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${q.driver}</td><td>${q.time}</td>`;
        qualiContainer.appendChild(row);
    });

    // Populate results table
    resultContainer.innerHTML = "";
    resultData.forEach(r => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${r.position}</td><td>${r.driver}</td><td>${r.time}</td>`;
        resultContainer.appendChild(row);
    });

    // Update podium
    const topThree = resultData.slice(0, 3);
    [podium.first, podium.second, podium.third].forEach((el, i) => {
        el.textContent = topThree[i]?.driver || "N/A";
    });
}

function filterByRound(data, round) {
    
    const parsedData = typeof data === "string" ? JSON.parse(data) : data;
    return parsedData.filter(entry => entry.race.round === round);
    
}



// Example invocation
main(2023);

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

// Build tables for rTbl, qTbl, and eTbl
function buildDomTables(data) {
    createTable(data.rTbl, 'rTbl-container', 'Race Table');
    createTable(data.qTbl, 'qTbl-container', 'Qualifying Table');
    createTable(data.eTbl, 'eTbl-container', 'Results Table');
}

// Example usage inside the main function
async function main(year) {
    const data = await fetchAndStoreData(year);
    buildDomTables(data);
}
