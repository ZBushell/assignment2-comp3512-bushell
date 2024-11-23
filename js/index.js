document.addEventListener("DOMContentLoaded", function(){

    
    
    const select = document.querySelector("select");
    year = select.addEventListener("change", (e) =>{
      
        //fetch all the stuff we need. 
       const races = getApiData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season="+ e.target.value);
       const quali = getApiData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season="+ e.target.value);
       const results = getApiData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?season="+ e.target.value);

       
       quali.then(data =>{console.dir(data)});
       results.then(data =>{console.dir(data)});
       races.then(data =>{console.dir(data)});

    });
   





    // handy dandy reusable api getter
    function getApiData(url){
        const apiFetch = fetch(url)
            .then(response =>{
                if(response.ok){
                    return response.json()
                }else{
                    console.dir(response);
                }})
            .catch(error =>{
                console.dir(error);
                throw error;
            });
        return apiFetch;
    }


});