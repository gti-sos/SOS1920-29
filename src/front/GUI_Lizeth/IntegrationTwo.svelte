<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";


    async function loadGraphs(){

        loadLastFMDataGraph();
        loadNapsterDataGraph();
        loadJamendoDataGraph();
        loadTVDataGraph();

    }

    
    async function loadLastFMDataGraph(){
       
        const res = await fetch("http://ws.audioscrobbler.com/2.0/?method=artist.gettopAlbums&artist=bts&api_key=f8868faf132a60030bd8e5abf7a9714a&format=json&limit=10");
        const res1 = await fetch("http://ws.audioscrobbler.com/2.0/?method=artist.gettopAlbums&artist=onerepublic&api_key=f8868faf132a60030bd8e5abf7a9714a&format=json&limit=10");
        const res2 = await fetch("http://ws.audioscrobbler.com/2.0/?method=artist.gettopAlbums&artist=taylorswift&api_key=f8868faf132a60030bd8e5abf7a9714a&format=json&limit=10");

        let data_final=[];

        if(res.ok && res1.ok && res2.ok){
            let json = await res.json();
            let data = json;

            let json1 = await res1.json();
            let data1 = json1;

            let json2 = await res2.json();
            let data2 = json2;


            //console.log (data);
           // console.log (data1);
           // console.log (data2);

            data_final.push({name: data.topalbums.album[0].artist.name,data:[]});
            data_final.push({name: data1.topalbums.album[0].artist.name,data:[]});
            data_final.push({name: data2.topalbums.album[0].artist.name,data:[]});
            //console.log(data_final);

            for(let i = 0; i < data.topalbums.album.length; i++){
                data_final[0].data.push({name: data.topalbums.album[i].name, value:data.topalbums.album[i].playcount});
            }
            for(let i = 0; i < data1.topalbums.album.length; i++){
                data_final[1].data.push({name: data1.topalbums.album[i].name, value:data1.topalbums.album[i].playcount});
            }
            for(let i = 0; i < data2.topalbums.album.length; i++){
                data_final[2].data.push({name: data2.topalbums.album[i].name, value:data2.topalbums.album[i].playcount});
            }

            
            //console.log(data_final);


           Highcharts.chart('container', {
                chart: {
                    type: 'packedbubble',
                },
                title: {
                    text: 'Top 10 Álbums de BTS, ONEREPUBLIC y TAYLOR SWIFT.'
                },
                tooltip: {
                    useHTML: true,
                    pointFormat: '<b>{point.name}:</b> {point.value} reproducciones'
                },
                plotOptions: {
                    packedbubble: {
                        minSize: '20%',
                        maxSize: '100%',
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
                series: data_final
            });
        
        } else{
            console.log("Error receiving data from LastFm api.");
        }
    }

    async function loadNapsterDataGraph(){
        const res = await fetch("http://api.napster.com/v2.2/tags/tag.152196523/playlists?apikey=YWZmOWY1ODUtNjY5Mi00NmQ2LWFjYTYtZmI3MDVmNzQ5M2Fj&limit=10&offset=10&sort=popularity&pretty=true");
        

        let data_final=[];
        if(res.ok){
            let json = await res.json();
            let data = json;
            console.log (data);
            for(let i = 0; i < data.playlists.length; i++){
                //console.log(data.records);
                //console.log(data.records[i].name);

                data_final.push({name: data.playlists[i].name, y: data.playlists[i].trackCount});

            }
            console.log(data_final);

            Highcharts.chart('napster', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Top Playlists de Napster'
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    }
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Número de canciones'
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y: f}'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y: f} canciones</b></br>'
                },

                series: [
                    {
                        name: "Playlists",
                        colorByPoint: true,
                        data: data_final
                    }
                        ]
                    
                      
            });

        }
        else{
            console.log("Error receiving data from Napster api.");
        }
       

    }

    async function loadJamendoDataGraph(){
       
       
        const res = await fetch("https://api.jamendo.com/v3.0/albums/tracks/?client_id=463ef8a5&format=jsonpretty&limit=1&artist_name=PAIGE+DINEEN");

        let data_final=[];
        if(res.ok){
            let json = await res.json();
            let data = json;
            console.log (data);
            //console.log(data.results[0].tracks.length);

            for(let i = 0; i < data.results[0].tracks.length; i++){
               // console.log(data.data);
               // console.log(data.data[i].api_model);

                data_final.push({name:data.results[0].tracks[i].name , low: parseInt(data.results[0].tracks[i].duration)});

            }
            console.log(data_final);
            
            Highcharts.chart('jamendo', {

                chart: {
                    type: 'lollipop'
                },

                accessibility: {
                    point: {
                        valueDescriptionFormat: '{index}. {xDescription}, {point.y}.'
                    }
                },

                legend: {
                    enabled: false
                },
                title: {
                    text: 'Temas y duracion del Álbum Vital Signs de Paige Dinee'
                },

                tooltip: {
                    shared: true
                },

                xAxis: {
                    type: 'category'
                },

                yAxis: {
                    title: {
                        text: 'Duracion en segundos'
                    }
                },

                series: [{
                    name: 'duracion',
                    data: data_final
                }]

                });
        
        } else{
            console.log("Error receiving data from Art Instirute Chicago api.");
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
    <script src="https://code.highcharts.com/modules/dumbbell.js"></script>
    <script src="https://code.highcharts.com/modules/lollipop.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraphs}></script>
</svelte:head>

<main>

    <b>Todas las APIs listadas son distintas, usadas una vez por gráfica mostrada, pulsando en el nombre se puede acceder a la documentación de dicha API.
    </b>

    <h1 class="titulo_API"><a href="https://www.last.fm/api/show/artist.getTopAlbums">LastFM API</a></h1>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">Se muesta el Top 10 Álbums de los artista BTS,ONEREPUBLIC Y TAYLOR SWIFT, tambien se muestra el numero de reproducciones de cada álbum.
        </p>
      </figure>

      <h1 class="titulo_API"><a href="http://api.napster.com/v2.2/tags/tag.152196523/playlists?apikey=YWZmOWY1ODUtNjY5Mi00NmQ2LWFjYTYtZmI3MDVmNzQ5M2Fj&limit=10&offset=10&sort=popularity&pretty=true">Napster API</a></h1>
      <figure class="highcharts-figure">
        <div id="napster"></div>
        <p class="highcharts-description">
          Se muestran el Top playlists de Napster y el número de canciones de cada playlist.
        </p>
      </figure>

      <h1 class="titulo_API"><a href="https://api.jamendo.com/v3.0/albums/tracks/?client_id=463ef8a5&format=jsonpretty&limit=1&artist_name=PAIGE+DINEEN">Jamendo API</a></h1>
      <figure class="highcharts-figure">
        <div id="jamendo"></div>
        <p class="highcharts-description">
          Se muestran los temas y sus respectivas duraciones en segundos del álbum Vital Signs de la artista Paige Dinee.
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