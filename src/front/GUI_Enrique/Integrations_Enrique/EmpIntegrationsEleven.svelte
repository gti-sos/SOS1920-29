<script>
    import { 
        pop 
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";


    async function loadGraph(){

        const res = await fetch("https://data.police.uk/api/stops-street?lat=52.629729&lng=-1.131592&date=2018-06");

        let Array_final = [];

        if(res.ok){
            
            let json = await res.json();
            let data_police = json;
            let cont = 0;

            data_police.forEach( (e) => {
              
                let lat = parseFloat(e.location["latitude"]);
                let long = parseFloat(e.location["longitude"]);
               
                cont += 1;
                if(cont < 10){
                    
                    Array_final.push({name: e.location["street"].name + " - " + e.age_range + " years", data: [[long, lat]]});
                }
 
            }); 
            //console.log(JSON.stringify(Array_final,null,2));

        }else{
            console.log("No se ha podido acceder a la API");
        }

        Highcharts.chart('container', {
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Detenciones UK'
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

    <h1 style="text-align:center">Integración 11</h1>
    <h4 style="text-align:center"><a href="https://data.police.uk/api/stops-street?lat=52.629729&lng=-1.131592&date=2018-06">UK Police data API</a></h4>
    <h5 style="text-align:center">Esta API devuelve datos de detenciones y búsquedas de delitos en Reino Unido.</h5>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            En la gráfica vemos el nombre de la calle (más la edad del individuo) y lugar (latitud y longitud) donde han ocurrido delitos y detenciones en Reino Unido. Son solo una aproximación del lugar donde ocurrieron las detenciones, no son las ubicaciones exactas.
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