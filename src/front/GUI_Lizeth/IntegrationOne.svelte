<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";
    
    const BASE_API_URL = "/api/v2";

    async function loadGraphs(){

        loadCooperhewittDataGraph();
        loadHarvardDataGraph();
        loadChicagoDataGraph();
        loadPixabayDataGraph();

    }

    
    async function loadCooperhewittDataGraph(){
       
        const res = await fetch("https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.departments.getList&access_token=2d93e25a88d905caf314b8906b1a4fc5&page=1&per_page=100");

        let data_final=[];

        if(res.ok){
            let json = await res.json();
            let data = json;

            //console.log (data);
            for(let i = 0; i < data.departments.length; i++){
                //console.log(data.departments);
                //console.log(data.departments[i].name);

                data_final.push({name: data.departments[i].name, y: parseInt(data.departments[i].count_objects), value1:false});

            }
           // console.log(data_final);


            Highcharts.chart('container', {

                chart: {
                styledMode: false
                },

                title: {
                text: "Departamentos y sus números de objetos."
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
        }
        else{
            console.log("Error receiving data from copper-heawitt api.");
        }

    }

    async function loadHarvardDataGraph(){

       
        const res = await fetch("https://api.harvardartmuseums.org/culture?apikey=a743d650-a183-11ea-acd3-49db0dc20e00");

        let data_final=[];
        if(res.ok){
            let json = await res.json();
            let data = json;
             let culture = [];
          //  console.log (data);
            for(let i = 0; i < data.records.length; i++){
                //console.log(data.records);
                //console.log(data.records[i].name);

                data_final.push({name: data.records[i].name, y: data.records[i].objectcount});
                culture.push({name: data.records[i].name});

            }
            //console.log(data_final);
            //console.log(culture);

            Highcharts.chart('hardvard', {

                title: {
                text: 'Culturas usadas para descibir objetos y el número de objetos de Harvard Art Museums'
                },

                xAxis: {

                    categories: [culture[0].name, culture[1].name,culture[2].name,culture[3].name,culture[4].name,culture[5].name,culture[6].name,culture[7].name,culture[8].name,culture[9].name]
                },

                series: [{
                type: 'column',
                colorByPoint: true,
                data: data_final,
                showInLegend: false
                }]

                });

        }
        else{
            console.log("Error receiving data from Harvard api.");
        }
       

    }

    async function loadChicagoDataGraph(){
       
       //proxy
        const res = await fetch(BASE_API_URL + "/chicagorequest");

       // const res = await fetch("https://aggregator-data.artic.edu/api/v1/artworks");

        let data_final=[];
        if(res.ok){
            let json = await res.json();
            let data = json;
           // console.log (data);
            for(let i = 0; i < data.data.length; i++){
               // console.log(data.data);
               // console.log(data.data[i].api_model);

                data_final.push({name:data.data[i].title , value:data.data[i].pageviews});

            }
           // console.log(data_final);
            
            Highcharts.chart('chicago', {
                chart: {
                    type: 'packedbubble',
                    height: '40%'
                },
                title: {
                    text: 'Número de vistas de distintos articulos.'
                },
                tooltip: {
                    useHTML: true,
                    pointFormat: '<b>{point.name}:</b> {point.value} vistas'
                },
                plotOptions: {
                    packedbubble: {
                        minSize: '20%',
                        maxSize: '100%',
                        zMin: 0,
                        zMax: 700,
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
                                value: 250
                            },
                            style: {
                                color: 'black',
                                textOutline: 'none',
                                fontWeight: 'normal'
                            }
                        }
                    }
                },
                series: [{name: "Artwork", data: data_final}]
            });
        
        } else{
            console.log("Error receiving data from Art Instirute Chicago api.");
        }
    }
    
    
    async function loadPixabayDataGraph(){
       //let Key="";
       
       const res = await fetch("https://pixabay.com/api/?key=16796962-02fb48acb23094715be6a143e&q=yellow+flowers&image_type=photo");
       

       let data_final=[];
       if(res.ok){
            let json = await res.json();
            let data = json;
            console.log(data);
           for(let i = 0; i < data.hits.length; i++){
               console.log(data.hits);
                console.log(data.hits[i].user);

               data_final.push({name:data.hits[i].user , data:[data.hits[i].comments, data.hits[i].favorites,data.hits[i].likes]});

           }
           console.log(data_final);
          Highcharts.chart('pixabay', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Número de likes,comentarios y favoritos de usuarios'
            },
            
            xAxis: {
                categories:["Comentarios", "Favoritos", "Likes"],
                crosshair: true
            },
            yAxis: {
                min: 0
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: data_final
        });
                
       
       } else{
           console.log("Error receiving data from Pixabay api.");
       }

    }

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraphs}></script>
</svelte:head>

<main>

    <b>Todas las APIs listadas son distintas, usadas una vez por gráfica mostrada, pulsando en el nombre se puede acceder a la documentación de dicha API.
    </b>

    <h1 class="titulo_API"><a href="https://collection.cooperhewitt.org/api/methods/cooperhewitt.departments.getList">Copper Hewitt Museo API</a></h1>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">Se muestra los distintos departamentos existentes y la cantidad de objetos que posee cada departamento.
        </p>
      </figure>

      <h1 class="titulo_API"><a href="https://github.com/harvardartmuseums/api-docs/blob/master/sections/culture.md">Harvard Art Museo API</a></h1>
      <figure class="highcharts-figure">
        <div id="hardvard"></div>
        <p class="highcharts-description">
          Se muestran las culturas usadas por Harvard Art museum para organizar los objetos y el número de estos.
        </p>
      </figure>

      <h1 class="titulo_API"><a href="https://aggregator-data.artic.edu/api/v1/artworks">Art Institute Chicago API</a></h1>
      <figure class="highcharts-figure">
        <div id="chicago"></div>
        <p class="highcharts-description">
          Se muestran los distintos articulos del Art Institute Chicago y el numero de visualizaciones de cada uno.
        </p>
      </figure>

      <h1 class="titulo_API"><a href="https://pixabay.com/api/docs/#api_javascript_example">Pixabay API</a></h1>
      <figure class="highcharts-figure">
        <div id="pixabay"></div>
        <p class="highcharts-description">
          Se muestran el número de likes, comentarios, favoritos de algunos usuarios de pixabay para fotos con etiqueta flores.
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