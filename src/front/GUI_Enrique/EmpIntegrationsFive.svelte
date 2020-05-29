<script>
    import { 
        pop 
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";


    async function loadGraph(){

        

        const res = await fetch("/free-nba.p.rapidapi.com", config);

        if(res.ok){
            console.log("Hola");
            
            let json = await res.json();
            let data_numbers = json;

           // console.log(JSON.stringify(data_numbers,null,2));
            let data_numbers_array = Object.values(data_numbers)
            //console.log(JSON.stringify(data_numbers_array[0],null,2));
            data_numbers_array.forEach( (e) => {
                console.log(JSON.stringify(e[0],null,2));
                
            });

        }else{
            console.log("No se ha podido acceder a la API");
        }

        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Historic World Population by Region'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: ['Hearst Castle', 'Los Angeles Union Station Amtrak', 'Seattle King Street Station Amtrak'],
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
            series: [{
                name: 'origin_dist_traveled',
                data: [107, 31, 635]
            }, {
                name: 'destination_dist_traveled',
                data: [13333.2, 156, 947]
        
            }]
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
    <h4 style="text-align:center"><a href="https://apis.is/earthquake/is">Earthquakes in Iceland API</a></h4>
    <h5 style="text-align:center">Esta API se encarga de ofrecernos datos de una monitorización de los terremotos ocurridos en Islandia en las últimas 48 horas.</h5>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Bar chart showing horizontal columns. This chart type is often
            beneficial for smaller screens, as the user can scroll through the data
            vertically, and axis labels are easy to read.
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