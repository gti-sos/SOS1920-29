<script>

    const BASE_API_URL = "/api/v1";

    async function loadGraphs(){

        let data = await loadData();

        loadGraph1(data);
        loadGraph2(data);
        
    }

    async function loadGraph1(loadedData){
        let recurso = "";
        let pos_dato = 0;
        let datos = [];
        let ano_comienzo = 0; //Guardo el primer año encontrado en la API.
        let ano_fin = 0; //Guardo el último año encontrado en la API.

        loadedData.sort(function (a,b){
            if (a.year > b.year) return 1;
            if (a.year < b.year) return -1;
            if(a.country.localeCompare(b.country) < 0) return -1;
            if(a.country.localeCompare(b.country) > 0) return 1;
        });

        ano_comienzo = loadedData[0].year;
        ano_fin = loadedData[loadedData.length-1].year;

        //Cargo en el array todos los países que encuentro en la API.
        for(let i = 0; i < loadedData.length; i++) {
            recurso = loadedData[i];

            //Si no encuentro el país en el array lo añado.
            if(datos.filter(dato => dato.name === recurso.country).length == 0){
                datos.push({name:recurso.country, data: []});
            }
            
            
        }

        for(let i = 0; i < (datos.length); i++){
            for(let a = 0; a <= (ano_fin-ano_comienzo); a++){
                //Si encuentro en la API un dato para el País/Año actual guardo ese valor en el nuevo array.
                if(loadedData.filter(dato => dato.year == (a+ano_comienzo) && dato.country == datos[i].name ).length > 0){
                    datos[i].data.push(loadedData.filter(dato => dato.year == (a+ano_comienzo) && dato.country == datos[i].name)[0].edq_sg);
                }
                //Si no encuentro un valor añado un null.
                else{
                    datos[i].data.push(null);
                }
            }
        }

        Highcharts.chart('container', {

            colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
                '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                    stops: [
                        [0, '#2a2a2b'],
                        [1, '#3e3e40']
                    ]
                },
                style: {
                    fontFamily: '\'Unica One\', sans-serif'
                },
                plotBorderColor: '#606063'
            },

            
            title: {
                text: 'Graduados en ciencias por cada 1.000 habitantes.'
            },

            yAxis: {
                title: {
                    text: 'Número de graduados en ciencia por 1.000 habitantes',
                    style: {
                        color: '#E0E0E3'
                    }
                }
            },

            xAxis: {
                allowDecimals: false
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: ano_comienzo
                }
            },
            
            series: datos,

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });


    }

    async function loadGraph2(loadedData){

    }

    async function loadData(){

        const res = await fetch(BASE_API_URL+"/edq-stats");
        let data = "";

        if(res.ok){
            const json = await res.json();
            data = json;
            //console.log(data);
        }
        else{
            console.log("Error receiving data.");
        }

        
        return data;
    }


</script>


<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraphs}"></script>
</svelte:head>

<main>
    <h3>Gráfica 1 EDQ_Stats (HighCharts)</h3>

    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>

    <h3>Gráfica 2 EDQ_Stats (Chart.js)</h3>
</main>