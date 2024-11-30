<<<<<<< HEAD
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



/*
|================|
|=DOM Operations=|
|================|
*/

document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("#selectYear").addEventListener("change", e=>{
    
    //const rTbl = document.querySelector("#raceTbl");
    //const qTbl = document.querySelector("#qualiTbl");
    //const eTbl = document.querySelector("#resultTbl");



    let c1 = getData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=", e.target.value, "races");


        c1.then(data =>{
            console.dir(data);
        });


//select statement bracket set
    });        
//dom bracket set
});   
    
    

document.addEventListener("DOMContentLoaded", () =>{

    const URLS = [
        "https://www/randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=",
        "https://www/randyconnolly.com/funwebdev/3rd/api/f1/results.php?season=",
        "https://www/randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season="
        ];
    
    async function fetchAPI(url, season){
        try {
           const response = await fetch(url + season);
           const data = await response.json();
           return data;
        } catch (error) {
            console.dir(error);
        }
    }

    fetchAPI(URLS[0],"2023").then(data=>{console.dir(data)});
});
>>>>>>> e6c3501 (botched async method requires keys)
