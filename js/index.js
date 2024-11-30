
const URLS = [
    "https://www/randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=",
    "https://www/randyconnolly.com/funwebdev/3rd/api/f1/results.php?season=",
    "https://www/randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season="
    ];

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

async function getAPIdata() {
    try {
        const response = await fetch(url + season);
        const data = await response.json();
        return data;
     } catch (error) {
         console.dir(error);
     }
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




    
//select statement bracket set
    });        
//dom bracket set
});   