<script>
    import { 
        pop 
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";


    async function loadGraph(){

        const res = await fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas");
        let Array_data = [];
        let Array_category = [];

        if(res.ok){
            
            let json = await res.json();
            let data_car = json;
            let cont = 0;

            data_car.forEach( (e) => {
                cont += 1;
                if(cont <= 10){
                 
                    let int_codigo = parseInt(e.codigo);
                    
                    Array_data.push(int_codigo);
                    Array_category.push(e.nome);
                    
                }
                
            });
            

        }else{
            console.log("No se ha podido acceder a la API");
        }

        var chart = Highcharts.chart('container', {

            title: {
                text: 'Códigos de coches (Brasil)'
            },

            subtitle: {
                text: ''
            },

            xAxis: {
                categories: Array_category
            },

            series: [{
                type: 'column',
                name: 'Código',
                colorByPoint: true,
                data: Array_data,
                showInLegend: false
            }]

        });

    }
    
</script>

<svelte:head>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
    </svelte:head>

<main>

    <h1 style="text-align:center">Integración 9</h1>
    <h4 style="text-align:center"><a href="https://parallelum.com.br/fipe/api/v1/carros/marcas">Brazilian Vehicles API</a></h4>
    <h5 style="text-align:center">Esta API obtiene los códigos de coches en Brasil.</h5>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            La gráfica muestra una serie de coches en el eje x y sus respectivos códigos en el eje y (Brasil).
        </p>
    </figure>
    <Button outline color="secondary" on:click="{pop}">Volver</Button>
    
</main>

<style>
    #container {
    height: 400px; 
    }

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
