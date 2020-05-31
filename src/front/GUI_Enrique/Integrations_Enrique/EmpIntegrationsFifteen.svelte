<script>
    import { 
        pop 
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";


    async function loadGraph(){

        const res = await fetch("https://api.covid19api.com/summary");
        let Array_data = [];
        let Array_confirmados = [];
        let Array_confirmados_total = [];
        let Array_recuperados_total = [];
        let Array_muertes = [];
        let Array_paises = [];

        if(res.ok){
            
            let json = await res.json();
            let data_covid = json;
           
            let data_covid_array = Object.values(data_covid["Countries"]);
            //console.log(JSON.stringify(data_covid_array,null,2));
            data_covid_array.forEach( (e) => {
                
                if(e["Country"] == 'Spain' || e["Country"] == 'France' || e["Country"] == 'Italy' || e["Country"] == 'Germany' || e["Country"] == 'Portugal' || e["Country"] == 'United States of America'){
                    console.log(JSON.stringify(e,null,2));
                    Array_confirmados.push(e["NewConfirmed"]);
                    Array_confirmados_total.push(e["TotalConfirmed"]);
                    Array_recuperados_total.push(e["TotalRecovered"]);
                    Array_muertes.push(e["TotalDeaths"]);
                    Array_paises.push(e["Country"]);

                }
                
            });
            Array_data.push({name: 'Nuevos confirmados', data: Array_confirmados});
            Array_data.push({name: 'Total confirmados', data: Array_confirmados_total});
            Array_data.push({name: 'Total de recuperados', data: Array_recuperados_total});
            Array_data.push({name: 'Total de muertes', data: Array_muertes});
                 
        }else{
            console.log("No se ha podido acceder a la API");
        }

       Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Covid-19'
            },
            subtitle: {
                text: 'Source: <a href="https://covid19api.com/">Covid 19 spread, infection and recovery</a>'
            },
            xAxis: {
                categories: Array_paises,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'miles',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
        
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: Array_data
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

    <h1 style="text-align:center">Integración 15</h1>
    <h4 style="text-align:center"><a href="https://api.covid19api.com/summary">Covid-19 API</a></h4>
    <h5 style="text-align:center">Esta API nos ofrece un resumen de casos nuevos y totales por país actualizado diariamente.</h5>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            En la gráfica vemos los nuevos confirmados, el total de confirmados, el total de recuperados y el número de muertes por Covid-19 en España, Francia, Italia, EEUU, Portugal y Alemania.
        </p>
    </figure>
    <Button outline color="secondary" on:click="{pop}">Volver</Button>
    
</main> 

<style>
    .highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
    max-width: 800px;
    margin: 1em auto;
}

#container {
    height: 400px;
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