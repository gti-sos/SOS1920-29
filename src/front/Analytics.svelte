<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";
    import {create_xData, devuelve_edqStats} from "./GUI_Jairo/loadDatasets_edq.js";
    import {devuelve_WomanStats} from "./GUI_Lizeth/loadDatasets_woman.js";
    import {devuelve_empStats} from "./GUI_Enrique/loadDatasets_emp.js";

    

    async function loadGraph(){

        //Creamos la lista de combinaciones País/Año entre las 3 APIs.
        let lista_conjunta = await create_xData();

        //Calculamos los datos correspondientes a la API edq_stats.
        let data_edq = await devuelve_edqStats(lista_conjunta);
        let data_woman = await devuelve_WomanStats(lista_conjunta);
        let data_emp = await devuelve_empStats(lista_conjunta);

        //console.log(data_edq);
        //console.log(data_woman);
        //console.log(data_emp);

        let data_final = [];
        
        
        for(let i = 0; i < data_edq.length; i++){
            data_final.push({name: lista_conjunta[i].country+"/"+lista_conjunta[i].year, data: data_woman[i].concat(data_edq[i],data_emp[i])});
        }

        //console.log(data_final);

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
                    'Nº investigadoras en educación superior',
                    'Nº investigadoras en administración',
                    'Nº investigadoras en negocios',
                    'Nº graduados en ciencias por 1.000 habitantes',
                    'Gasto del gobierno en educación (billones)',
                    'Ratio alumnos/profesor',
                    '% empleo juvenil femenino',
                    '% empleo juvenil masculino',
                    '% empleo vulnerable femenino',
                    '% empleo vulnerable masculino'
                    //comentario

                ],
                labels: {
                    style: {
                        fontWeight: 'bold'
                    }
                }
            },
            yAxis:{
                min :0
            },
            series: data_final
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