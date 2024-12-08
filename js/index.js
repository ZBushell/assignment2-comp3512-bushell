
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
        console.dir(response);
        return await response.json();
    } catch (error) {
        console.dir(error);
        throw error;
    }
}

// Fetch and store rTbl, qTbl, and eTbl data separately
async function fetchAndStoreData(year) {
    const rTbl = getLocalCopy('rTbl'+year) || await fetchTableData(URLS.rTbl, year);
    const qTbl = getLocalCopy('qTbl'+year) || await fetchTableData(URLS.qTbl, year);
    const eTbl = getLocalCopy('eTbl'+year) || await fetchTableData(URLS.eTbl, year);

    // Save to local storage
    saveLocalCopy('rTbl'+year, rTbl);
    saveLocalCopy('qTbl'+year, qTbl);
    saveLocalCopy('eTbl'+year, eTbl);

    return { rTbl, qTbl, eTbl };
}


//don't touch above, it works
//work on stuff below.




function raceTable(data){
    const tblBox = document.querySelector("#rTbl-container");
    data.forEach(e=>{
        const child = document.createElement("tr");
        child.innerHTML = '<td>'+e.round+'</td><td>'+e.name+'</td><td><button value="'+e.round+'">Results</button></td>';
        tblBox.appendChild(child);
    });
}
function filterTables(tbl,round){

    const filteredRaces = [];
    

    for (let i = 0; i < tbl.length; i++) {
        if (tbl[i].race.round === round) {
            filteredRaces.push(tbl[i]);
        }
    }
    return filteredRaces;
}
function buildQTable(data){
    const tblBox = document.querySelector("#rTbl-container");
    
    for (let i=0; i < data.length; i++){
        console.dir(data[i].constructor);
    }


}


// Table building logic using separate data
function buildDomTables(data) {
    const { rTbl, qTbl, eTbl } = data;
    
    console.log(qTbl[0].race.round);
    
    raceTable(rTbl);
    buildQTable(filterTables(qTbl,9));
    
}

// Example usage inside the main function
async function main(year) {
    const data = await fetchAndStoreData(year);
    buildDomTables(data);
}

//rebuild all your stuff now.
document.addEventListener("DOMContentLoaded", function(){

    const seasonMenu = document.querySelector("#selectYear");
    
    //build the race menu.
    seasonMenu.addEventListener("change", e =>{
        
         main(e.target.value);
    });

    //build qualifying and race results.


});

