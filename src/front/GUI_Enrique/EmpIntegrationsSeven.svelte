<script>
    import { 
        pop 
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";


    async function loadGraph(){

        const res = await fetch("https://transit.land/api/v1/schedule_stop_pairs?bbox=-121.0,35.0,-124.0,37.0");
        let Array_final = [];
        let Array_origin = [];
        let Array_dest = [];
        let Array_category = [];

        if(res.ok){
            
            let json = await res.json();
            let data_rutas = json;
            let cont = 0;

            let data_rutas_array = Object.values(data_rutas)
            //console.log(JSON.stringify(data_rutas_array,null,2));
            data_rutas_array.forEach( (e) => {
                //console.log(JSON.stringify(e,null,2));
                for(let i = 0; i< e.length; i++){

                    cont += 1;
                    if(cont <= 3){
                        
                        Array_origin.push(e[i].origin_dist_traveled);
                        Array_dest.push(e[i].destination_dist_traveled);
                        Array_category.push(e[i].trip_headsign);
                        
                    }
                }
        
            }); 

            Array_final.push({name: 'distancia de origen', data: Array_origin});
            Array_final.push({name: 'distancia de destino', data: Array_dest});

        }else{
            console.log("No se ha podido acceder a la API");
        }

        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Rutas San Francisco'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: Array_category,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'miles (Kms)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' miles'
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
                y: 140,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
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

    <h1 style="text-align:center">Integración 4</h1>
    <h4 style="text-align:center"><a href="https://apis.is/earthquake/is">Transitland Datastore API</a></h4>
    <h5 style="text-align:center">Esta API se encarga de ofrecernos rutas operadas por la Agencia de Transporte Municipal de San Francisco (SFMTA).</h5>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            La gráfica nos muestra la distancia de origen y destino recorrida de algunas rutas.
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
