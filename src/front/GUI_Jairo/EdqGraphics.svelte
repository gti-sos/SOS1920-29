<script>

    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";
    import Chart from 'chart.js';
    import 'chartjs-plugin-colorschemes';

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
            if(datos.filter(dato => dato.name == recurso.country).length == 0){
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

            
            title: {
                text: 'Graduados en ciencias por cada 1.000 habitantes.'
            },

            yAxis: {
                title: {
                    text: 'Número de graduados en ciencia por 1.000 habitantes'
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
        let spain_data = "";
        let graph_data = [{labels:["Graduados en ciencias por 1.000 habitantes","Gasto en educación (billones)", "Ratio alumnos/maestro"], datasets:[]}];


        //Filtro loadedData para quedarme solo con las posiciones en las que country:"Spain"      
        if(loadedData.filter(dato => dato.country.localeCompare("Spain") == 0).length > 0){
            spain_data = loadedData.filter(dato => dato.country.localeCompare("Spain") == 0);

            for(let i = 0; i < spain_data.length; i++){
                graph_data[0].datasets.push({"label":spain_data[i].country+" - "+spain_data[i].year, "data":[spain_data[i].edq_sg, spain_data[i].edq_gee, spain_data[i].edq_ptr],"fill":true});
            }

        }
        else{
            console.log("DATA NOT FOUND.");
        }

        var myRadarChart = new Chart(chartjs_graph, {
            type: 'radar',
            data: graph_data[0],
            options: {
                plugins:{
                    colorschemes:{
                        scheme: 'brewer.Accent8'
                    }
                },
                scale: {
                    gridLines: {
                        color: 'rgb(168,168,168,1)'
                    },
                    angleLines: {
                        color: 'rgb(168,168,168,1)' // lines radiating from the center
                    }
                   
                }
            }
        });



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
    <h3>Graduados en ciencias.</h3>

    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>

    <h3>Análisis de la calidad educativa en España.</h3>
    <figure class="chartjs-figure">
        <canvas id="chartjs_graph"></canvas>
    </figure>

    <Button outline color = "secondary" on:click="{pop}">Volver</Button>

</main>