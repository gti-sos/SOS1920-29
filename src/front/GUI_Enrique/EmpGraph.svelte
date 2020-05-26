<script>

    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";

    async function loadGraph(){

        let MyData = [];
        let MyDataEmp = [];

        let MyDataArraySpain = [];
        let MyDataArrayItaly = [];
        let MyDataArrayCzechia = [];
        let MyDataArrayFinland = [];
        let MyDataArrayMalta = [];
        let MyDataArrayCroatia = [];
        let MyDataArrayPortugal = [];
        let MyDataArrayLithuania = [];
        
        let cont_spain = 0;
        let cont_italy = 0;
        let cont_czechia = 0;
        let cont_finland = 0;
        let cont_malta = 0;
        let cont_croatia = 0;
        let cont_portugal= 0;
        let cont_lithuania = 0;

        const resData = await fetch("/api/v2/emp-stats");
        MyData = await resData.json();
        
        MyData.forEach( (e) => {
            if(e.country == 'Spain'){
                cont_spain += 1;
                MyDataArraySpain.push({year: e.year , value: e.emp_vuln_female})
                if(cont_spain == 3){
                    MyDataEmp.push({name: e.country, data: MyDataArraySpain});
                }
                
            }else if(e.country == 'Italy'){
                cont_italy += 1;
                MyDataArrayItaly.push({year: e.year , value: e.emp_vuln_female})
                if(cont_italy == 3){
                    MyDataEmp.push({name: e.country, data: MyDataArrayItaly});
                }
                
            }else if(e.country == 'Czechia'){
                cont_czechia += 1;
                MyDataArrayCzechia.push({year: e.year , value: e.emp_vuln_female})
                if(cont_czechia == 3){
                    MyDataEmp.push({name: e.country, data: MyDataArrayCzechia});
                }

            }else if(e.country == 'Finland'){
                cont_finland += 1;
                MyDataArrayFinland.push({year: e.year , value: e.emp_vuln_female})
                if(cont_finland == 3){
                    MyDataEmp.push({name: e.country, data: MyDataArrayFinland});
                }

            }else if(e.country == 'Malta'){
                cont_malta += 1;
                MyDataArrayMalta.push({year: e.year , value: e.emp_vuln_female})
                if(cont_malta == 3){
                    MyDataEmp.push({name: e.country, data: MyDataArrayMalta});
                }

            }else if(e.country == 'Croatia'){
                cont_croatia += 1;
                MyDataArrayCroatia.push({year: e.year , value: e.emp_vuln_female})
                if(cont_croatia == 3){
                    MyDataEmp.push({name: e.country, data: MyDataArrayCroatia});
                }

            }else if(e.country == 'Portugal'){
                cont_portugal += 1;
                MyDataArrayPortugal.push({year: e.year , value: e.emp_vuln_female})
                if(cont_portugal == 3){
                    MyDataEmp.push({name: e.country, data: MyDataArrayPortugal});
                }

            }else if(e.country == 'Lithuania'){
                cont_lithuania += 1;
                MyDataArrayLithuania.push({year: e.year , value: e.emp_vuln_female})
                if(cont_lithuania == 3){
                    MyDataEmp.push({name: e.country, data: MyDataArrayLithuania});
                }

            }
            
                       
        });

        Highcharts.chart('container', {
        chart: {
            type: 'packedbubble',
            height: '100%'
        },
        title: {
            text: 'Empleo vulnerable, mujeres (% del empleo femenino)'
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.year}:</b> {point.value}%</sub>'
        },
        plotOptions: {
            packedbubble: {
                minSize: '40%',
                maxSize: '100%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    gravitationalConstant: 0.05,
                    splitSeries: true,
                    seriesInteraction: false,
                    dragBetweenSeries: true,
                    parentNodeLimit: true
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.year}',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 1
                    },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        series: MyDataEmp
        });
    }
    

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>

    <h1 style="text-align:center">Gráfica 1 </h1>

    <figure class="highcharts-figure">
    <div id="container"></div>
        <p class="highcharts-description">
        La gráfica nos muestra el porcentaje de empleo vulnerable femenino que existió durante los años 2013, 2014 y 2015 en algunos países de Europa.
        </p>
    </figure>

    <Button outline color="secondary" on:click="{pop}">Volver</Button>

</main>

<style>
    .highcharts-figure, .highcharts-data-table table {
    min-width: 320px; 
    max-width: 800px;
    margin: 1em auto;
    }

    .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #EBEBEB;
        margin: 10px auto;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }
    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
    }
    .highcharts-data-table th {
        font-weight: 600;
        padding: 0.5em;
    }
    .highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
        padding: 0.5em;
    }
    .highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
        background: #f8f8f8;
    }
    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }

</style>

