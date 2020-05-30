<script>
    import { 
        pop 
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";


    async function loadGraph(){

        const res = await fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population");
        let Array_data = [];
        let Array_final = [];

        if(res.ok){
            
            let json = await res.json();
            let data_poblation = json;
            let cont = 0;
            let cont2 = 0;
            let pais = '';

            let data_poblation_array = Object.values(data_poblation);

            data_poblation_array.forEach( (e) => {
                cont2 += 1;
                for(let i=0; i<e.length; i++){
                    cont += 1;
                    if(cont < 7){
                        pais = e[i].Nation;
                        Array_data.push(e[i].Population);
                        
                    }
                }
                if(cont2 < 2){
                    
                    Array_final.push({name: pais, data: Array_data}); 
                    //console.log(JSON.stringify(Array_final,null,2));
                }
                
            });
                 
        }else{
            console.log("No se ha podido acceder a la API");
        }

        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            accessibility: {
                description: ''
            },
            title: {
                text: 'Poblation USA'
            },
            subtitle: {
                text: 'Sources: https://datausa.io/about/api/'
            },
            xAxis: {
                allowDecimals: false,
                labels: {
                    formatter: function () {
                        return this.value; // clean, unformatted number for year
                    }
                },
                accessibility: {
                    rangeDescription: 'Range: 2013 to 2018.'
                }
            },
            yAxis: {
                title: {
                    text: 'Población'
                },
                labels: {
                    formatter: function () {
                        return this.value / 1000 + 'k';
                    }
                }
            },
            tooltip: {
                pointFormat: '<b>{series.name}</b> poblation: <b>{point.y:,.0f}</b><br/>in {point.x}'
            },
            plotOptions: {
                area: {
                    pointStart: 2013,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
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
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
    </svelte:head>

<main>

    <h1 style="text-align:center">Integración 13</h1>
    <h4 style="text-align:center"><a href="https://datausa.io/api/data?drilldowns=Nation&measures=Population">US Public Data API</a></h4>
    <h5 style="text-align:center">Esta API nos ofrece la población de EEUU en los años 2013-2018.</h5>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            En la gráfica vemos una comparativa de la población que ha tenido EEUU desde 2013 hasta 2018.
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

    #container {
        height: 450px;
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