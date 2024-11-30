 //helper function for get data
 function getLocalCopy(key){
    const data = localStorage.getItem(key);
    try {
        
        return JSON.parse(data);
    
    } catch (error) {
        console.dir(error);
        throw error;
    }
}

//does what it's named
function saveLocalCopy(key, data){

    localStorage.setItem(key, JSON.stringify(data));

}

//helper function for getData
function fetchAPIData(url, year){
    const URL = url + year;

    return fetch(URL).then(response =>{
        
        if(!response.ok)
            throw new Error("failed to fetch JSON data");
        return response.json();
    }).then(data =>{
        return JSON.stringify(data);
    });
}

function getData(url, year, type){

    const storageKey = year + type;
    const seasonData = getLocalCopy(storageKey);
    //check if there's a local copy
    if(seasonData)
        return seasonData;

    //else, fetch, save locally, and return
    return fetchAPIData(url, year)
    .then(data =>{
        saveLocalCopy(storageKey, data);
        return data;
    }).catch(error =>{
        console.error("Error while fetching", error);
        throw error;
    });
}

function fetchSeasonData(year) {
    // Initialize an empty array to hold the results
    const seasonData = [];

    // Create an array of promises to fetch data for races, qualifying, and results
    const promises = [
        getData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=", year, "races"),
        getData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season=", year, "qualifying"),
        getData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?season=", year, "results")
    ];

    // Use Promise.all to wait for all requests to resolve
    return Promise.all(promises)
        .then(results => {
            // Push all results to seasonData
            seasonData.push(...results);  // Spread the results into the seasonData array
            return seasonData;  // Return the seasonData array
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;  // Propagate the error
        });
}

/*
|================|
|=DOM Operations=|
|================|
*/

document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("#selectYear").addEventListener("change", e=>{
        console.log(e.target.value);
        const c1 = fetchSeasonData(e.target.value);
        console.dir(c1);
        
    });   
    
    
   
});