<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";


    async function loadGraphs(){

        loadOpenDataGraph();
        loadCarbonDataGraph();
        loadEnergiaDataGraph();
        loadOpenWeatherDataGraph();

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
    
    
    async function loadOpenWeatherDataGraph(){
       //let Key="";
       //sevilla
        const res = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=37.38283&lon=-5.97317&exclude=hourly&appid=50c4b2f6525f7e74f88e4a3564925684");
       //madrid
        const res1 = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=40.4165&lon=-3.70256&exclude=hourly&appid=50c4b2f6525f7e74f88e4a3564925684");
       //barcelona
        const res2 = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=41.38879&lon=2.15899&exclude=hourly&appid=50c4b2f6525f7e74f88e4a3564925684");


       let data_final=[];
       let ciudad=[];
       if(res.ok && res1.ok && res2.ok){
            let json = await res.json();
            let data = json;
            console.log(data);

            let json1 = await res1.json();
            let data1 = json1;
            console.log(data1);

            let json2 = await res2.json();
            let data2 = json2;
            console.log(data2);

            ciudad.push({name:"Sevilla"});
            ciudad.push({name:"Madrid"});
            ciudad.push({name:"Barcelona"});

            console.log(data_final);

            data_final.push({name: "Temperatura Actual", data:[parseFloat((data.current.temp-273.15).toFixed(2)),
             parseFloat((data1.current.temp-273.15).toFixed(2)),parseFloat((data2.current.temp-273.15).toFixed(2))]});
            console.log(data_final);

            data_final.push({name: "Temperatura Máxima", data:[parseFloat((data.daily[0].temp.max-273.15).toFixed(2)),
             parseFloat((data1.daily[0].temp.max-273.15).toFixed(2)),parseFloat((data2.daily[0].temp.max-273.15).toFixed(2))]}); 
             
             data_final.push({name: "Temperatura Minima", data:[parseFloat((data.daily[0].temp.min-273.15).toFixed(2)),
             parseFloat((data1.daily[0].temp.min-273.15).toFixed(2)),parseFloat((data2.daily[0].temp.min-273.15).toFixed(2))]});

           console.log(data_final);

           Highcharts.chart('open', {

                chart: {
                    type: 'column'
                },

                title: {
                    text: 'Temperaturas de Sevilla, Madrid y Barcelona'
                },

                legend: {
                    align: 'right',
                    verticalAlign: 'middle',
                    layout: 'vertical'
                },

                xAxis: {
                    categories: [ciudad[0].name,ciudad[1].name,ciudad[2].name],
                    labels: {
                        x: -10
                    }
                },

                yAxis: {
                    allowDecimals: false,
                    title: {
                        text: 'Temperatura en Grados Celsius'
                    }
                },

                series: data_final,

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                align: 'center',
                                verticalAlign: 'bottom',
                                layout: 'horizontal'
                            },
                            yAxis: {
                                labels: {
                                    align: 'left',
                                    x: 0,
                                    y: -5
                                },
                                title: {
                                    text: null
                                }
                            },
                            subtitle: {
                                text: null
                            },
                            credits: {
                                enabled: false
                            }
                        }
                    }]
                }
                });
                
       
       } else{
           console.log("Error receiving data from Open Weather api.");
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

      <h1 class="titulo_API"><a href="https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly&appid=50c4b2f6525f7e74f88e4a3564925684">Open Weather API</a></h1>
      <figure class="highcharts-figure">
        <div id="open"></div>
        <p class="highcharts-description">
            Se muestran las temperaturas maximas, minimas y actuales del dia presente de las ciudades de Sevilla, Madrid y Barcelona.
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