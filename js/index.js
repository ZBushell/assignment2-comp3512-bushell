
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
        //console.dir(response);
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
        child.innerHTML = '<td>'+e.round+'</td><td id="'+e.circuit.ref+'">'+e.name+'</td><td><button data-value1="'+e.year+ '" data-value2="'+e.round+'">Results</button></td>';
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


//builds the qualifying table
function buildQandETables(qTbl, eTbl){
    
    
    //qualifying tables
    const tblBox = document.querySelector("#qTbl-container");
    clearTables("#qTbl-container");
    
    for (let i=0; i < qTbl.length; i++){
        //console.dir(qTbl[i]);
        const childRow = document.createElement("tr");
        childRow.innerHTML = '<td>'+qTbl[i].position+'</td>'+
        '<td><span id="driver '+qTbl[i].driver.ref+'">'
        +qTbl[i].driver.forename+' '
        +qTbl[i].driver.surname+'</span></td>'+
        '<td><span id="constructor '+qTbl[i].constructor.ref+'">'+
        qTbl[i].constructor.name+'</span></td>'
        +'<td>'+qTbl[i].q1+'</td>'
        +'<td>'+qTbl[i].q2+'</td>'+
        '<td>'+qTbl[i].q3+'</td>';

        tblBox.appendChild(childRow);
    }


    //results table
    const eTblBox = document.querySelector("#eTbl-container");
    clearTables("#eTbl-container");    


    for (let i=0; i < eTbl.length; i++){
        //console.dir(eTbl[i]);
        const childRow = document.createElement("tr");
        childRow.innerHTML = '<td>'+eTbl[i].position+'</td>'
        +'<td> <span id="driver '+eTbl[i].driver.ref+'">'+eTbl[i].driver.forename+' '+eTbl[i].driver.surname+'</span></td>'
        +'<td> <span id="constructor '+eTbl[i].constructor.ref+'">'+eTbl[i].constructor.name+'</span></td>'
        +'<td>'+eTbl[i].laps+'</td>'
        +'<td>'+eTbl[i].points+'</td>';
        eTblBox.appendChild(childRow);
    }
}



//don't touch above, it works
//work on stuff below.

async function main(year){
    const data = await fetchAndStoreData(year);
    const { rTbl, qTbl, eTbl } = data;
    console.dir(rTbl);
    raceTable(rTbl);
    unhideElement("#browse");
}

async function main2(year, round){
    const data = await fetchAndStoreData(year);
    const { rTbl, qTbl, eTbl } = data;
    buildQandETables(filterTables(qTbl,round),filterTables(eTbl,round));
}

async function main3(year, secondID){
    const data = await fetchAndStoreData(year);
    const { rTbl, qTbl, eTbl } = data;
    buildDriverCard(secondID, qTbl);
}
async function main4(year, secondID){
    const data = await fetchAndStoreData(year);
    const { rTbl, qTbl, eTbl } = data;
    buildConstructorCard(secondID, qTbl);
}

async function main5(year, circuitID){
    const data = await fetchAndStoreData(year);
    const { rTbl, qTbl, eTbl } = data;
    buildConstructorCard(circuitID, eTbl);
}


function buildDriverCard(secondID, Tbl) {
    const driverData = Tbl.find(entry => entry.driver.ref === secondID);

    if (!driverData) {
        console.error(`Driver with ref "${secondID}" not found.`);
        return;
    }

    // Select the container where the card will be appended
    const container = document.querySelector("#driverCard");
    if (!container) {
        console.error('Container with ID "driverCard" not found.');
        return;
    }

    container.innerHTML = '';

    container.innerHTML = `
        <div>
            <span id="driverName">${driverData.driver.forename} ${driverData.driver.surname}</span>
            <span id="driverNationality">${driverData.driver.nationality}</span>
            <span id="driverUrl">${driverData.driver.number}</span>
        </div>
    `;
    unhideElement("#driverCard");
}


function buildConstructorCard(secondID, Tbl) {
    const constructorData = Tbl.find(entry => entry.constructor.ref === secondID);

    const container = document.querySelector("#constructorCard");
    if (!constructorData) {
        console.error(`Constructor with name "${secondID}" not found.`);
        return null;
    }
    container.innerHTML = '';

    container.innerHTML = `
        <div>
            <span id="constructorName">${constructorData.constructor.name}</span>
            <span id="constructorNationality">${constructorData.constructor.nationality}</span>
            <span id="constructorUrl">${constructorData.constructor.url}</span>
        </div>
    `;
    unhideElement("#constructorCard");

}


function buildCircuitCard(secondID, Tbl) {
    const circuitData = Tbl.find(entry => entry.circuit.ref === secondID);

    const container = document.querySelector("#circuitCard");
    if (!circuitData) {
        console.error(`Circuit with name "${secondID}" not found.`);
        return null;
    }
    container.innerHTML = '';

    container.innerHTML = `
        <div>
            <span id="circuitName">${constructorData.circuit.name}</span>
            <span id="circuitNationality">${constructorData.circuit.country}</span>
            <span id="circuitUrl">${constructorData.circuit.url}</span>
        </div>
    `;
    unhideElement("#circuitCard");

}



/*

]=================[
]= PROGRAM START =[
]=================[

*/


hideElement("#browse");
hideElement("#driverCard");
hideElement("#constructorCard");
hideElement("#circuitCard");

//rebuild all your stuff now.
document.addEventListener("DOMContentLoaded", function(){

    
   

    //build the race menu.
    document.querySelector("#selectYear").addEventListener("change", e =>{
        clearTables("#rTbl-container");
        main(e.target.value);
    });

    //build qualifying and race results.
    document.querySelector("#races").addEventListener("click", e =>{
       
        //WHYYYYYYYY JAVASCRIPT! I THOUGHT YOU DIDN'T CARE ABOUT TYPING
        main2(parseInt(e.target.dataset.value1), parseInt(e.target.dataset.value2));

    }); 

    document.querySelector("#qTbl-container").addEventListener("click", e =>{
        
        const clicked = e.target.id
        const parts = clicked.split(" ");
        const secondId = parts[1];
        
        if(clicked.includes("driver")){
            // Create a driver card
            main3(2023, secondId);
            unhideElement("#driverCard");
        }
        else if (clicked.includes("constructor")){
            
            main4(2023, secondId);
            unhideElement("#constructorCard");
            
        }

    });

    document.querySelector("#eTbl-container").addEventListener("click", e =>{
        
        const clicked = e.target.id
        const parts = clicked.split(" ");
        const secondId = parts[1];

        if(clicked.includes("driver")){
            // Create a driver card
            main3(2023, secondId);
            unhideElement("#driverCard");
        }
        else if (clicked.includes("constructor")){
            
            main4(2023, secondId);
            unhideElement("#constructorCard");
            
        }

    });

    document.querySelector("#rTbl-container").addEventListener("click", e =>{

        if(e.target.tagName !== 'BUTTON'){
            console.dir(e.target.id);
            main5(2023, e.target.id);
        }

    });

});

