<script>
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    async function loadGraph() {
       
        let MyData = [];
        let MyDataArray = [];
        let MyDataEmp = [];

        const resData = await fetch("/api/v2/emp-stats");
        MyData = await resData.json();
        
        console.log("my data: "+JSON.stringify(MyData,null,2));
        
        MyData.forEach( (e) => {
            if(e.country == 'Spain' && e.year == 2013){
                MyDataArray.push({name: 'emp_female_age15_24', y: e.emp_female_age15_24}, {name: 'emp_male_age15_24', y: e.emp_male_age15_24}, {name: 'emp_vuln_female', y: e.emp_vuln_female}, {name: 'emp_vuln_male', y: e.emp_vuln_male})
                console.log("Data array: "+JSON.stringify(MyDataArray,null,2));
                MyDataEmp.push({name: e.country + " " + e.year, data: MyDataArray});
            }
            
        });
        console.log("Data emp: "+JSON.stringify(MyDataEmp,null,2));

        Highcharts.chart('container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Porcentajes de empleo juvenil y vulnerable en hombres y mujeres de algunos países de Europa'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: MyDataEmp
        });
    }
</script>

<svelte:head>   
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>

    <h1 style="text-align:center">Gráfica 1 </h1>

    <figure class="highcharts-figure">
    <div id="container"></div>
        <p class="highcharts-description">
        La gráfica nos muestra un porcentaje de empleo vulnerable y empleo juvenil tanto en hombre como mujeres.
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


    input[type="number"] {
        min-width: 50px;
    }
</style>