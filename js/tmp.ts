
        //fetch all the stuff we need. 
        let races, quali, results;

        

       
        races = getApiData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season="+ e.target.value);
        quali = getApiData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season="+ e.target.value);
        results = getApiData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?season="+ e.target.value);



            //console.dir(qTbl.race); 
            //console.dir(qTbl.race.round);
            

            // const filterTbl = eTbl.filter(e => e.race.round === round);
            // const filterQTbl = qTbl.filter(q => q.race.round === round);

            
            

            //qalifying table
            console.dir(filterQTbl);
            filterQTbl.forEach(element =>{
                let c1 = document.createElement("tr");
                c1.innerHTML = '<td>'+element.position+'</td><td>'
                +element.driver.forename+" "+element.driver.surname+'</td><td>'
                +element.constructor.name+'</td><td>'
                +element.q1+'</td><td>'
                +element.q2+'</td><td>'
                +element.q3+'</td>';
                seasonQuali.appendChild(c1);
            });
            
            //results table
            filterTbl.forEach(element =>{

                let c1 = document.createElement("tr");
                c1.innerHTML = '<td>'+element.position+'</td><td>'
                +element.driver.forename+" "+element.driver.surname+'</td><td>'
                +element.constructor.name+'</td><td>'
                +element.laps+'</td><td>'
                +element.points+'</td><td>';
                seasonResult.appendChild(c1);

            });