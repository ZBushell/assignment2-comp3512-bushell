document.addEventListener("DOMContentLoaded", function(){

    
    //fetch data needed 
    const select = document.querySelector("select");
    year = select.addEventListener("change", (e) =>{
      
        //fetch all the stuff we need. 
        let races, quali, results;

        

       
        races = getApiData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season="+ e.target.value);
        quali = getApiData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season="+ e.target.value);
        results = getApiData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?season="+ e.target.value);
 

    });
   
    //local storage handler
    function getData(promise, year, data){
        let v1 = promise;
        let localCopy = localStorage.getItem(year + data);
        if(localCopy){
        
        }


        return raceData;
    }


    // handy dandy reusable api getter
    function getApiData(url){
        return fetch(url)
            .then(response =>{
                if(response.ok){
                    return response.json();
                }else{
                    console.dir(response);
            }})
            .catch(error =>{
                console.dir(error);
                throw error;
            });
    }


});