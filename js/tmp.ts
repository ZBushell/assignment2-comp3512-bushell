
        //fetch all the stuff we need. 
        let races, quali, results;

        

       
        races = getApiData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season="+ e.target.value);
        quali = getApiData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season="+ e.target.value);
        results = getApiData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?season="+ e.target.value);