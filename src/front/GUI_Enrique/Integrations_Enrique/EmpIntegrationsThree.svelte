<script>
    import { 
        pop 
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";


    async function loadGraph(){

        const res = await fetch("https://apis.is/earthquake/is");
        let Array_data = [];

        if(res.ok){
            
            let json = await res.json();
            let data_terremotos = json;
            
            //console.log(JSON.stringify(data_terremotos,null,2));
            let data_terremotos_array = Object.values(data_terremotos);
            //console.log(JSON.stringify(data_terremotos_array,null,2));
            data_terremotos_array.forEach( (e) => {
                
                e.forEach( (x) => {
                    if( x.quality >= 60){
                        Array_data.push({name: x.humanReadableLocation, y: x.depth, z: x.quality});

                    }             
                    
                });
            }); 
            //console.log(JSON.stringify(Array_data,null,2));

        }else{
            console.log("No se ha podido acceder a la API");
        }

        Highcharts.chart('container', {
            chart: {
                type: 'variablepie'
            },
            title: {
                text: 'Terremotos en Islandia'
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                    'depth : <b>{point.y}</b><br/>' +
                    'quality: <b>{point.z}</b><br/>'
            },
            series: [{
                minPointSize: 10,
                innerSize: '20%',
                zMin: 0,
                name: 'location',
                data: Array_data
            }]
        });
    }

    
</script>


<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/variable-pie.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>

    <h1 style="text-align:center">Integración 3</h1>
    <h4 style="text-align:center"><a href="https://apis.is/earthquake/is">Earthquakes in Iceland API</a></h4>
    <h5 style="text-align:center">Esta API se encarga de ofrecernos datos de una monitorización de los terremotos ocurridos en Islandia en las últimas 48 horas.</h5>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            La gráfica nos muestra los terremetos que ha habido en Islandia en las últimas 48 horas. Podemos ver la ubicación exacta de dicho terremeto (por ejemplo, 4,6 km al norte de Herðubreið), en la longitud de sus barras la calidad del terremoto y en la anchura la profundidad.
        </p>
    </figure>
    <Button outline color="secondary" on:click="{pop}">Volver</Button>

</main>

<style>
    #container {
	height: 500px;
    }

    .highcharts-figure, .highcharts-data-table table {
        min-width: 320px; 
        max-width: 700px;
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