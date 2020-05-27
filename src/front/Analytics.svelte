<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";
    import {create_xData,loadDataset_sg, loadDataset_gee, loadDataset_ptr} from "./GUI_Jairo/loadDatasets_edq.js";

    //create_xData();

    async function loadGraph(){

        var data = [
            [1012518000000, 5, 2311020, 0, 462180, 1, 0,1012518000000, 5, 1],
            [1012950000000, 6, 3232020, 4, 538680, 0, 0,1012518000000, 5, 0],
            [1013122800000, 4.5, 2419020, 3, 537540, 1, 0,1012518000000, 5, 0]
        ];

        Highcharts.chart('container', {
            chart: {
                parallelCoordinates: true,
                parallelAxes: {
                    labels: {
                        style: {
                            color: '#999999'
                        }
                    },
                    gridLineWidth: 1,
                    lineWidth: 2,
                    showFirstLabel: false,
                    showLastLabel: true
                },
                polar: true
            },
            title: {
                text: 'Comparativa de estadísticas del grupo'
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span>' +
                '{series.name}: <b>{point.formattedValue}</b><br/>'
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
                },
                gridLineWidth: 0
            },
            yAxis: [
                {
                    type: 'datetime',
                    tooltipValueFormat: '{value:%Y-%m-%d}'
                }, 
                {
                    min: 0,
                    tooltipValueFormat: '{value} mile(s)'
                }, 
                {
                    type: 'datetime',
                    min: 0,
                    labels: {
                        format: '{value:%H:%M}'
                    }
                }, 
                {
                    categories: [
                        'Other',
                        'Adidas',
                        'Mizuno',
                        'Asics',
                        'Brooks',
                        'New Balance',
                        'Izumi'
                    ],
                    min: -1
                }, 
                {
                    type: 'datetime'
                }, 
                {
                    categories: ['&gt; 5miles', '&lt; 5miles'],
                    min: -1,
                    max: 1
                }, 
                {
                categories: ['Before', 'After'],
                min: -1,
                max: 1
                },
                {
                    type: 'linear'
                },
                {
                    type: 'linear'
                },
                {
                    type: 'linear'
                }],
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