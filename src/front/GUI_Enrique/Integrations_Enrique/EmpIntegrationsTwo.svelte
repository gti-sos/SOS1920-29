<script>
    import { 
        pop 
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";

    async function loadGraph(){

        let Array_final = [];
        let Array_male = [];
        let Array_female = [];
        let Array_data_male = [];
        let Array_data_female = []

        const res = await fetch("https://api.genderize.io/?name[]=peter&name[]=lois&name[]=stevie&name[]=michael&name[]=andrew&name[]=alexa&name[]=amelie&name[]=adele&name[]=charlize&name[]=ariel");

        if(res.ok){
            console.log("Hola");
            
            let json = await res.json();
            let data_name = json;

            console.log(JSON.stringify(data_name,null,2));
            data_name.forEach( (e) => {
                if(e.gender == 'male'){
                    Array_male.push(e);
                }else{
                    Array_female.push(e);
                }
        
            }); 
            Array_male.forEach( (m) => {
                Array_data_male.push({name: m.name, value: m.probability})
                
            });
            Array_final.push({name: 'male', data: Array_data_male});

            Array_female.forEach( (m) => {
                Array_data_female.push({name: m.name, value: m.probability})
                
            });
            Array_final.push({name: 'female', data: Array_data_female})
            
            
        }else{
            console.log("No se ha podido acceder a la API");
        }

        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '100%'
            },
            title: {
                text: 'Predicción de género'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}%</sub>'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '0%',
                    maxSize: '1500%',  
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        gravitationalConstant: 0.05,
                        splitSeries: true,
                        seriesInteraction: false,
                        dragBetweenSeries: true,
                        parentNodeLimit: true
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 0
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                } 
            },
            series: Array_final
        });
    }

    
</script>


<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <h1 style="text-align:center">Integración 2</h1>
    <h4 style="text-align:center"><a href="https://genderize.io/">Genderize API</a></h4>
    <h5 style="text-align:center">Esta API determina el género de un nombre. API para predecir el género de una persona dada su nombre.</h5>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            La gráfica muestra los porcentajes de que una persona por como se llama, sea hombre o mujer. Por ejemplo si te llamas Alexa tienes un 0,93% de probabilidad de que seas mujer.
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