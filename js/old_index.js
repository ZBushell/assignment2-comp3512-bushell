
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
        saveLocalCopy(cacheKey, JSON.stringify(seasonData));

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

function filterAndPopulateData(round, qTbl, eTbl, qualiContainer, resultContainer) {
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

    // // Update podium
    // const topThree = resultData.slice(0, 3);
    // [podium.first, podium.second, podium.third].forEach((el, i) => {
    //     el.textContent = topThree[i]?.driver || "N/A";
    // });
}

function filterByRound(data, round) {
    return JSON.parse(data).filter(entry => entry.race.round === round);
}



/*
|================|
|=DOM Operations=|
|================|
*/

document.addEventListener("DOMContentLoaded", function(){
    
    
    const yearSelect = document.querySelector("#selectYear");
    const raceTbl = document.querySelector("#raceTbl");
    const qualiTable = document.querySelector("#qualiTbl");
    const resultTable = document.querySelector("#resultTbl");



    yearSelect.addEventListener("change", async event => {
        const year = event.target.value;
        const { rTbl, qTbl, eTbl } = await getSeasonData(URLS, year);
        populateRaceTable(rTbl, raceTbl);
    });


    raceTbl.addEventListener("click", async event => {
        if (event.target.tagName === "BUTTON") {
            const round = event.target.dataset.round;
            const year = yearSelect.value;
            const { qTbl, eTbl } = await getSeasonData(URLS, year);
            console.dir(JSON.stringify(eTbl));
            console.dir(eTbl);
            filterAndPopulateData(round, qTbl, eTbl, qualiTable, resultTable);
        }
    });
       
//dom bracket set
});