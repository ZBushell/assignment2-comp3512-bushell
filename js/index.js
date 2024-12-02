
const URLS = [
    "https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=",
    "https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season=",
    "https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?season="
    
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

async function getAPIData(url, year) {
    try {
        const response = await fetch(url + year);
        const data = await response.json();
        return data;
     } catch (error) {
         console.dir(error);
     }
}

//gets data from promises and returns something useful. 
//also stores data locally if not there already.
async function getDataFromPromise(url, year){
    const key = year + "-key"; 
    const cachedData = getLocalCopy(key);

    if (cachedData) {
        
        //return
        const { rTbl, qTbl, eTbl } = cachedData;
        return { rTbl, qTbl, eTbl };
    } else {
    
        try {
            const results = url.map(urls => getAPIData(urls, year));
            const data = await Promise.all(results);
            const [rTbl, qTbl, eTbl] = data;
        
            // Save the fetched data to localStorage
            saveLocalCopy(key, { rTbl, qTbl, eTbl });
            
            return {rTbl, qTbl, eTbl};
        
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }
}

/*
|================|
|=DOM Operations=|
|================|
*/

document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("#selectYear").addEventListener("change", e=>{
        
        const seasonRaces = document.querySelector("#raceTbl");
      

        getDataFromPromise(URLS,e.target.value).then(({rTbl, qTbl, eTbl}) =>{
            
            console.dir(rTbl);
            console.dir(qTbl);
            console.dir(eTbl);
            //build the races list.
            rTbl.forEach(e =>{
                let c1 = document.createElement("tr");
                c1.innerHTML = '<td>'+e.round+'</td><td>'+e.name+'</td><td><button id="'+e.round+'">Results</button></td>';
                seasonRaces.appendChild(c1);

            });
            
        });

    //select statement bracket set
    });

    //build the rest of the race results
    document.querySelector("#raceTbl").addEventListener("click", e =>{
        const seasonQuali = document.querySelector("#qualiTbl");
        const seasonResult = document.querySelector("#resultTbl");
        const first =document.querySelector("#first");
        const second =document.querySelector("#second");
        const third =document.querySelector("#thrid");        



        let round; 
        //make sure it's actually a button
        if(e.target.tagName === 'BUTTON'){
            round = e.target.id;
        }

        //TODO: FILTER THE RACE PROPERLY
        //build qualifying table
        getDataFromPromise(URLS,e.target.value).then(({rTbl, qTbl, eTbl}) =>{
            qTbl.forEach(element =>{
                let c1 = document.createElement("tr");
                c1.innerHTML = '<td>'+element.position+'</td><td>'
                +element.driver.forename+" "+element.driver.surname+'</td><td>'
                +element.constructor.name+'</td><td>'
                +element.q1+'</td><td>'
                +element.q2+'</td><td>'
                +element.q3+'</td>';
                seasonQuali.appendChild(c1);
            });
        });

        //TODO: FILTER THE RACE PROPERLY
        //build race Results Table.
        getDataFromPromise(URLS,e.target.value).then(({rTbl, qTbl, eTbl}) =>{
            eTbl.forEach(element =>{
                let c2 = document.createElement("span");
                switch(element.position){
                    case "1":
                        c2.innerHTML = '<h3>'+element.driver.forename+" "+element.driver.surname+'</h3>';
                        first.appendChild(c2);
                    case "2":
                        c2.innerHTML = '<h3>'+element.driver.forename+" "+element.driver.surname+'</h3>';
                        first.appendChild(c2);
                    case "3":
                        c2.innerHTML = '<h3>'+element.driver.forename+" "+element.driver.surname+'</h3>';
                        first.appendChild(c2);
                }
                

                let c1 = document.createElement("tr");
                c1.innerHTML = '<td>'+element.position+'</td><td>'
                +element.driver.forename+" "+element.driver.surname+'</td><td>'
                +element.constructor.name+'</td><td>'
                +element.laps+'</td><td>'
                +element.points+'</td><td>';
                seasonResult.appendChild(c1);

            });
        });

        



    //slect statement brackets
    });    


//dom bracket set
});   