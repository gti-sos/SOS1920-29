<script>
    import { 
        pop 
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";

    const BASE_API_URL = "/api/v2";

    async function loadGraph(){

        const res = await fetch(BASE_API_URL + "/pullrequests");
        
        let json = await res.json();
        let data_pull = json;
        let data_contribution = [];
        let data_users = [];
        
        // console.log(JSON.stringify(data_pull,null,2));
        data_pull.forEach( (e) => {
            
            if(e.contributions_count >= 50){
                // console.log(e.contributions_count);
                // console.log(e.nickname);
                data_contribution.push(e.contributions_count);
                data_users.push(e.nickname);

            }
             
        });

        Highcharts.chart('container', {
            chart: {
                
                type: 'column'
            },
            title: {
                text: 'Contribución de usuarios en GitHub'
            },
            tooltip: {
                shared: true
            },
            xAxis: {
                categories: data_users,
                
            },
            yAxis: [{
                title: {
                    text: ''
                }
            }, {
                title: {
                    text: ''
                },
                
            }],
            series: [{
                name: 'Contribución',
                type: 'column',
                data: data_contribution
            }]
        });
    }

    
</script>


<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/pareto.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>

    <h1 style="text-align:center">Integración 1 (Con Proxy)</h1>
    <h4 style="text-align:center"><a href="https://24pullrequests.com/api">24 pull requests API</a></h4>
    <h5 style="text-align:center">Esta API viene de un proyecto para promover la colaboración de código abierto.</h5>
    
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            La gráfica muestra todas las contribuciones de los usuarios de GitHub durante el mes de diciembre, ordenado de mayor a menor contribución, también incluye el nombre del usuario que realizó dicha contribución.
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



