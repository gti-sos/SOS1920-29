<script>
    import { 
        pop 
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";


    async function loadGraph(){

        const res = await fetch("https://randomuser.me/api/");
        let Array_data = [];

        if(res.ok){
            
            let json = await res.json();
            let data_user = json;

            let data_user_array = Object.values(data_user);
            //console.log(JSON.stringify(data_user_array,null,2));
            data_user_array.forEach( (e) => {
                for(let i = 0; i< e.length; i++){
                
                    Array_data.push({name: "Nombre: "+e[i].name["first"] +" - Género: " + e[i].gender+ " - Ciudad: " + e[i].location["city"] + " - País: " + e[i].location["country"], data: [e[i].location["street"].number, e[i].location["postcode"], e[i].dob["age"]]})
                }
                
                
            });
            
        }else{
            console.log("No se ha podido acceder a la API");
        }

        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Usuario aleatorio'
            },
            subtitle: {
                text: 'Source: https://randomuser.me/'
            },
            xAxis: {
                categories: ['Núnmero de la calle', 'Código postal', 'Edad']
            },
            yAxis: {
                title: {
                    text: 'valores'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
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

    <h1 style="text-align:center">Integración 10</h1>
    <h4 style="text-align:center"><a href="https://randomuser.me/api/">RandomAPI</a></h4>
    <h5 style="text-align:center">Esta API genera datos de usuarios aleatorios.</h5>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            En esta gráfica vemos datos de usuarios aleatorios como el nombre, el género, la ciudad, el país, número de la calle en la que vive, código postal y la edad. Cada vez que refrescas la página, aparece uno distinto.
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
