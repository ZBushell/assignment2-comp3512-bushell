document.addEventListener("DOMContentLoaded", function(){

    // fetch api data for everything.
    let year;
    const select = document.querySelector("select");
    year = select.addEventListener("change", (e) =>{
       const c1 = getApiData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season="+ e.target.value);

       c1.then(data =>{console.dir(data)});
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