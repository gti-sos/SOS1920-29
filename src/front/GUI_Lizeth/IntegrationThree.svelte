<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";


    async function loadGraphs(){

        loadOpenDataGraph();
        loadCarbonDataGraph();
        loadEnergiaDataGraph();
        loadTVDataGraph();

    }

    
    async function loadOpenDataGraph(){
       
        const res = await fetch("https://api.openaq.org/v1/latest");
       
        let data_final=[];

        if(res.ok){
            let json = await res.json();
            let data = json;
            //console.log (data);

            let datofiltrado="";
            let datofiltradofinal="";

            for(let i = 0; i < data.results.length; i++){
                datofiltrado = data.results.filter(dato => dato.measurements[0].parameter.localeCompare("pm10") == 0);                
            }
            //console.log (datofiltrado);
            datofiltradofinal= datofiltrado.filter(dato => dato.location.localeCompare("40AB02 - BERENDRECHT")==0 
            || dato.location.localeCompare("41R012 - UCCLE")==0 || dato.location.localeCompare("43M204 - ANGLEUR")==0);

            //console.log (datofiltradofinal);

            //console.log (data);
            for(let i = 0; i < datofiltradofinal.length; i++){
                
                data_final.push({name: datofiltradofinal[i].city, data:[datofiltradofinal[i].measurements[0].value,datofiltradofinal[i].measurements[1].value]});

            }
            // console.log(data_final);


             Highcharts.chart('container', {

                chart: {
                    type: 'column',
                    styledMode: false
                },

                title: {
                    text: 'Particulas en suspensión'
                },

                yAxis: [{
                    className: 'highcharts-color-0',
                    title: {
                        text: 'Valor en µg/m³'
                    }
                }],
                xAxis: {
                    categories:["PM10","PM2.5"]
                },
                plotOptions: {
                    column: {
                        borderRadius: 5
                    }
                },

                series: data_final

                });
        }
        else{
            console.log("Error receiving data from copper-heawitt api.");
        }

    }

    async function loadCarbonDataGraph(){

       
        const res = await fetch("https://api.carbonintensity.org.uk/regional/england");

        let data_final=[];
        if(res.ok){
            let json = await res.json();
            let data = json;

            //console.log (data);

          //  console.log (data);

          function getColorPattern(i) {
                var colors = Highcharts.getOptions().colors,
                    patternColors = [colors[2], colors[0], colors[3], colors[1], colors[4],colors[5],colors[6],colors[7],colors[8],colors[9]],
                    patterns = [
                        'M 0 0 L 5 5 M 4.5 -0.5 L 5.5 0.5 M -0.5 4.5 L 0.5 5.5',
                        'M 0 5 L 5 0 M -0.5 0.5 L 0.5 -0.5 M 4.5 5.5 L 5.5 4.5',
                        'M 1.5 0 L 1.5 5 M 4 0 L 4 5',
                        'M 0 1.5 L 5 1.5 M 0 4 L 5 4',
                        'M 0 1.5 L 2.5 1.5 L 2.5 0 M 2.5 5 L 2.5 3.5 L 5 3.5'
                    ];

                return {
                    pattern: {
                        path: patterns[i],
                        color: patternColors[i],
                        width: 5,
                        height: 5
                    }
                };
            }
            for(let i = 0; i < data.data[0].data[0].generationmix.length; i++){
                //console.log(data.records);
                //console.log(data.records[i].name);

                data_final.push({name: data.data[0].data[0].generationmix[i].fuel, y: data.data[0].data[0].generationmix[i].perc, color:getColorPattern(i)});

            }
            //console.log(data_final);
            
            Highcharts.chart('carbon', {
                chart: {
                    type: 'pie'
                },

                title: {
                    text: 'Combustibles utilizados en Inglaterra'
                },

                tooltip: {
                    valueSuffix: '%',
                    borderColor: '#8ae'
                },

                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            connectorColor: '#777',
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        },
                        point: {
                            events: {
                                click: function () {
                                    window.location.href = this.website;
                                }
                            }
                        },
                        cursor: 'pointer',
                        borderWidth: 3
                    }
                },

                series: [{
                    name: 'Porcentaje',
                    data: data_final
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            plotOptions: {
                                series: {
                                    dataLabels: {
                                        format: '<b>{point.name}</b>'
                                    }
                                }
                            }
                        }
                    }]
                }
            });

        }
        else{
            console.log("Error receiving data from Carbon intensity api.");
        }
       

    }

    async function loadEnergiaDataGraph(){
       
       
        const res = await fetch("https://developer.nrel.gov/api/pvwatts/v5.json?api_key=zPImAGwp538nRoZpHwLaEJaY3hx1s9pU01UsglFg&lat=40&lon=-105&system_capacity=4&azimuth=180&tilt=40&array_type=1&module_type=1&losses=10");

        let data_final=[];
        if(res.ok){
            let json = await res.json();
            let data = json;
           // console.log (data);
           data_final.push({name:"Irradiancia Directa Solar", data:[]});
           data_final.push({name:"Radiación Solar", data:[]});

            for(let i = 0; i < data.outputs.poa_monthly.length; i++){
               // console.log(data.data);
               // console.log(data.data[i].api_model);
                data_final[0].data.push(parseFloat((data.outputs.poa_monthly[i]).toFixed(2)));
            }
            for(let i = 0; i < data.outputs.solrad_monthly.length; i++){
               // console.log(data.data);
               // console.log(data.data[i].api_model);
                data_final[1].data.push(parseFloat((data.outputs.solrad_monthly[i]).toFixed(2)));
            }
            console.log(data_final);
            
            Highcharts.chart('energia', {

                chart: {
                    type: 'column',
                    styledMode: false
                },

                title: {
                    text: 'Energia Fotovoltaica De un Planta de Nueva york.'
                },
                xAxis:{
                    categories:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
                },

                yAxis: [{
                    className: 'highcharts-color-0',
                    title: {
                        text: 'Medida Irradiancia Directa Solar, en (kWh/m2)'
                    }
                }, {
                    className: 'highcharts-color-1',
                    opposite: true,
                    title: {
                        text: 'Medida radiacion solar, en (kWh/m2/day)'
                    }
                }],

                plotOptions: {
                    column: {
                        borderRadius: 5
                    }
                },

                series: [{name:data_final[0].name,data:data_final[0].data},{name:data_final[1].name, data:data_final[1].data, yAxis:1}]

                });
        
        } else{
            console.log("Error receiving data from Energy api.");
        }
    }
    
    
    async function loadTVDataGraph(){
       //let Key="";
       
       const res = await fetch("http://api.tvmaze.com/shows");
       

       let data_final=[];
       if(res.ok){
            let json = await res.json();
            let data = json;
            console.log(data);

            let datoFiltrado=[];
            for(let i = 0; i < data.length; i++){
                if(data[i].rating.average >= 8 && data[i].weight > 91 &&data[i].weight <94){
                    datoFiltrado.push(data[i]);
                }
            }
            console.log(datoFiltrado);

           for(let i = 0; i < datoFiltrado.length; i++){

               data_final.push({name:datoFiltrado[i].name , y:datoFiltrado[i].rating.average});

           }
           console.log(data_final);
           Highcharts.chart('tv', {

                chart: {
                    styledMode: false
                },

                title: {
                    text: 'Puntuación de Series'
                },

                xAxis: {
                },

                series: [{
                    type: 'pie',
                    allowPointSelect: true,
                    keys: ['name', 'y', 'selected'],
                    data: data_final,
                    showInLegend: true
                }]
                });
                
       
       } else{
           console.log("Error receiving data from TVMaze api.");
       }

    }

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/pattern-fill.js"></script>
    <script src="https://code.highcharts.com/themes/high-contrast-light.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraphs}></script>
</svelte:head>

<main>

    <b>Todas las APIs listadas son distintas, usadas una vez por gráfica mostrada, pulsando en el nombre se puede acceder a la documentación de dicha API.
    </b>

    <h1 class="titulo_API"><a href="https://api.openaq.org/v1/latest">OPENAQ API</a></h1>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">Se muestra los niveles de particulas en suspensión de tres ciudades de Bélgica.
        </p>
      </figure>

      <h1 class="titulo_API"><a href="https://carbon-intensity.github.io/api-definitions/?shell#carbon-intensity-api-v2-0-0">Carbon Intensity API</a></h1>
      <figure class="highcharts-figure">
        <div id="carbon"></div>
        <p class="highcharts-description">
          Se muestras los distintos combustibles utilizados en Inglaterray el porcentaje de estos.
        </p>
      </figure>

      <h1 class="titulo_API"><a href="https://developer.nrel.gov/docs/solar/pvwatts/v5/?ref=apilist.fun">NREL PVWATTS API</a></h1>
      <figure class="highcharts-figure">
        <div id="energia"></div>
        <p class="highcharts-description">
          Se muestras dos sistemas de produccion de energia fotovoltaica y sus respectivas medidas.
        </p>
      </figure>

      <h1 class="titulo_API"><a href="http://www.tvmaze.com/api#embedding">TVMaze API</a></h1>
      <figure class="highcharts-figure">
        <div id="tv"></div>
        <p class="highcharts-description">
          Se muestras la puntuación de algunas series de la plataforma TVMaze.
        </p>
      </figure>


    <Button outline color = "secondary" on:click="{pop}">Volver</Button>

</main>

<style>
    .titulo_API{
        margin-top: 50px;
        text-align: center;
    }
    #hardvard {
  height: 400px; 
}

   
</style>