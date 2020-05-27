<script>

    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";

    async function loadGraph(){

        let MyData = [];
        let MyDataEmp = [];

        let MyDataArray = [];

        const resData = await fetch("/api/v2/emp-stats");
        MyData = await resData.json();

        if(MyData.length == 0){
            console.log("Array vacío");
        
        }else{
            MyData.forEach( (e) => {
            MyDataArray.push({country_name: e.country + " " + e.year, value: e.emp_vuln_female});
        
            }); 
            MyDataEmp.push({name: 'Europe', data: MyDataArray});
        }


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
            pointFormat: '<b>{point.country_name}:</b> {point.value}%</sub>'
        },
        plotOptions: {
            packedbubble: {
                minSize: '0%',
                maxSize: '600%',
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
                    format: '{point.country_name}',
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
        La gráfica nos muestra el porcentaje de empleo vulnerable femenino en algunos países de Europa.
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

