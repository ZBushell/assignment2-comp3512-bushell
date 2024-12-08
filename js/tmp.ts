
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


            getDataFromPromise(URLS,e.target.value).then(({rTbl, qTbl, eTbl}) =>{
                // console.dir(rTbl);
                // console.dir(qTbl);
                // console.dir(eTbl);
                //build the races list.
                rTbl.forEach(e =>{
                    let c1 = document.createElement("tr");
                    c1.innerHTML = '<td>'+e.round+'</td><td>'+e.name+'</td><td><button id="'+e.round+'">Results</button></td>';
                    seasonRaces.appendChild(c1);
    
                });
                
            });

            // Function to create and populate a table dynamically
function createTable(data, containerId, title, rowClickHandler = null) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found.`);
        return;
    }

    const table = document.createElement('table');
    table.classList.add('data-table');

    if (title) {
        const caption = document.createElement('caption');
        caption.textContent = title;
        table.appendChild(caption);
    }

    const thead = document.createElement('thead');
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    data.forEach(row => {
        const tableRow = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header];
            tableRow.appendChild(td);
        });

        // Attach click handler if provided
        if (rowClickHandler) {
            tableRow.addEventListener('click', () => rowClickHandler(row));
        }

        tbody.appendChild(tableRow);
    });
    table.appendChild(tbody);

    container.innerHTML = ''; // Clear previous content
    container.appendChild(table);
}

// Function to handle race row clicks
function onRaceRowClick(race, qTbl, eTbl) {
    const round = race.round;

    // Filter qualifying and results data based on the selected race's round
    const filteredQTbl = qTbl.filter(q => q.race.round === round);
    const filteredETbl = eTbl.filter(e => e.race.round === round);

    // Populate qualifying and results tables
    createTable(filteredQTbl, 'qTbl-container', `Qualifying Results for Round ${round}`);
    createTable(filteredETbl, 'eTbl-container', `Race Results for Round ${round}`);
}

// Build tables with event listeners
function buildDomTables(data) {
    const { rTbl, qTbl, eTbl } = data;

    // Generate race table with row click handlers
    createTable(rTbl, 'rTbl-container', 'Race Table', race => onRaceRowClick(race, qTbl, eTbl));

    // Qualifying and Results tables will be generated on race click
}
