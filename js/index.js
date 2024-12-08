
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

function raceTable(data){
    const tblBox = document.querySelector("#rTbl-container");
    data.forEach(e=>{
        const child = document.createElement("tr");
        child.innerHTML = '<td>'+e.round+'</td><td>'+e.name+'</td><td><button data-value1="'+e.year+ '" data-value2="'+e.round+'">Results</button></td>';
        tblBox.appendChild(child);
    });
}
//filters the tables because the .filter method doesn't work
function filterTables(tbl,round){

    const filteredRaces = [];
    

    for (let i = 0; i < tbl.length; i++) {
        if (tbl[i].race.round === round) {
            filteredRaces.push(tbl[i]);
        }
    }
    return filteredRaces;
}
//hides elements
function hideElement(elementId) {
    const element = document.querySelector(elementId);
    if (element) {
        element.style.display = 'none';
    } else {
        console.error(`Element with ID "${elementId}" not found.`);
    }
}

//unhides elements
function unhideElement(elementId) {
    const element = document.querySelector(elementId);
    if (element) {
        element.style.display = '';
    } else {
        console.error(`Element with ID "${elementId}" not found.`);
    }
}


//clears tables so results dont stack.
function clearTables(selector){
    document.querySelector(selector).innerHTML = " ";
}

//don't touch above, it works
//work on stuff below.



//builds the qualifying table
function buildQandETables(qTbl, eTbl){
    
    
    //qualifying tables
    const tblBox = document.querySelector("#qTbl-container");
    clearTables("#qTbl-container");
    
    for (let i=0; i < qTbl.length; i++){
        //console.dir(qTbl[i]);
        const childRow = document.createElement("tr");
        childRow.innerHTML = '<td>'+qTbl[i].position+'</td><td>'+qTbl[i].driver.forename+' '+qTbl[i].driver.surname+'</td><td>'+qTbl[i].constructor.name+'</td><td>'+qTbl[i].q1+'</td><td>'+qTbl[i].q2+'</td><td>'+qTbl[i].q3+'</td>';
        tblBox.appendChild(childRow);
    }


    //results table
    const eTblBox = document.querySelector("#eTbl-container");
    clearTables("#eTbl-container");    


    for (let i=0; i < eTbl.length; i++){
        //console.dir(eTbl[i]);
        const childRow = document.createElement("tr");
        childRow.innerHTML = '<td>'+eTbl[i].position+'</td><td>'+eTbl[i].driver.forename+' '+eTbl[i].driver.surname+'</td><td>'+eTbl[i].constructor.name+'</td><td>'+eTbl[i].laps+'</td><td>'+eTbl[i].points+'</td>';
        eTblBox.appendChild(childRow);
    }
}



async function main(year){
    const data = await fetchAndStoreData(year);
    const { rTbl, qTbl, eTbl } = data;
    raceTable(rTbl);
    unhideElement("#browse");
}

async function main2(year, round){
    const data = await fetchAndStoreData(year);
    const { rTbl, qTbl, eTbl } = data;
    buildQandETables(filterTables(qTbl,round),filterTables(eTbl,round));
}


hideElement("#browse");
hideElement("#driverCard");
hideElement("#constructorCard");
hideElement("#circuitCard");

//rebuild all your stuff now.
document.addEventListener("DOMContentLoaded", function(){

    
   

    //build the race menu.
    document.querySelector("#selectYear").addEventListener("change", e =>{

        main(e.target.value);
    });

    //build qualifying and race results.
    document.querySelector("#races").addEventListener("click", e =>{
       
        //WHYYYYYYYY JAVASCRIPT! I THOUGHT YOU DIDN'T CARE ABOUT TYPING
        main2(parseInt(e.target.dataset.value1), parseInt(e.target.dataset.value2));

    }); 

});

