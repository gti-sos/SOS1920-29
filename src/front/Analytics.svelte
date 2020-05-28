<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";
    import {create_xData, devuelve_edqStats} from "./GUI_Jairo/loadDatasets_edq.js";
    import {devuelve_WomanStats} from "./GUI_Lizeth/loadDatasets_woman.js";

    

    async function loadGraph(){

        //Creamos la lista de combinaciones País/Año entre las 3 APIs.
        let lista_conjunta = await create_xData();

        //Calculamos los datos correspondientes a la API edq_stats.
        let data_edq= devuelve_edqStats(lista_conjunta);

        var data = [
            [1, 5, 23, 3, 46, 1, 0, 1012, 5, 1],
            [1, 5, 23, 3, 55, 1, 4, 2000, 5, 2]
        ];

        Highcharts.chart('container', {
            chart: {
                type: 'line',
                parallelCoordinates: true,
                polar: true
            },
            title: {
                text: 'Comparativa de estadísticas del grupo'
            },
            legend: {
                enabled: true,
                borderWidth: 1,
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },
            xAxis: {
                categories: [
                    '% empleo vulnerable femenino',
                    '% empleo vulnerable masculino',
                    '% empleo juvenil masculino',
                    '% empleo juvenil femenino',
                    'Nº graduados en ciencias por 1.000 habitantes',
                    'Gasto del gobierno en educación (billones)',
                    'Ratio alumnos/profesor',
                    'Nº investigadoras en educación superior',
                    'Nº investigadoras en administración',
                    'Nº investigadoras en negocios'
                ],
                labels: {
                    style: {
                        fontWeight: 'bold'
                    }
                }
            },
            series: data.map(function (set, i) {
                return {
                    name: 'Runner ' + i,
                    data: set
                };
            })
        });
    
    
    }

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/parallel-coordinates.js" on:load="{loadGraph}"></script>
</svelte:head>


<main>
    <h3>Gráfica comparativa conjunta.</h3>

    <div id="container"></div>


    <Button outline color = "secondary" on:click="{pop}">Volver</Button>

</main>