<script>
    import { 
        pop 
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";


    async function loadGraph(){

        const res = await fetch("https://www.refugerestrooms.org/api/v1/restrooms/by_date?page=1&per_page=10&offset=0&updated=true&day=23&month=2&year=2000");

        let Array_final = [];

        if(res.ok){
            
            let json = await res.json();
            let data_restrooms = json;

            data_restrooms.forEach( (e) => {
                //console.log(JSON.stringify(e,null,2));
                Array_final.push({name: e.state + "-" + e.city, data: [[e.latitude, e.longitude]]})
 
            });  


        }else{
            console.log("No se ha podido acceder a la API");
        }

        Highcharts.chart('container', {
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Acceso seguro a los baños (EEUU)'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'Longitude'
                },
                allowDecimals: true,
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Latitude'
                }
            },
            legend: {
                enabled: true
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x} longitude, {point.y} latitude'
                    }
                }
            },
            series: Array_final
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

    <h1 style="text-align:center">Integración 5</h1>
    <h4 style="text-align:center"><a href="https://www.refugerestrooms.org/api/v1/restrooms/by_date?page=1&per_page=10&offset=0&updated=true&day=23&month=2&year=2000">Refuge Restrooms API</a></h4>
    <h5 style="text-align:center">Esta API nos proporciona acceso seguro a los baños para personas transgénero, intersexuales, etc.</h5>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            En la gráfica vemos el lugar (latitud y longitud) exacto donde hay baños seguros en EEUU (Estado y Ciudad) para personas que lo necesiten.
        </p>
    </figure>
    <Button outline color="secondary" on:click="{pop}">Volver</Button>

</main>

<style>
    .highcharts-figure, .highcharts-data-table table {
    min-width: 360px; 
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