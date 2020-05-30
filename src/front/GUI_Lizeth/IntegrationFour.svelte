<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";


    async function loadGraphs(){

        loadBiodiversityDataGraph();
        loadNewyorkDataGraph();
        loadCoinDataGraph();

    }

    
    async function loadBiodiversityDataGraph(){
        const res = await fetch("https://api.gbif.org/v1/species/");

        let data_final=[];

        if(res.ok){
            let json = await res.json();
            let data = json;

            //console.log (data);
            for(let i = 0; i < data.results.length; i++){
                //console.log(data.departments);
                //console.log(data.departments[i].name);

                data_final.push({name: data.results[i].scientificName, y: data.results[i].numDescendants});

            }
           //console.log(data_final);


            Highcharts.chart('container', {

                chart: {
                    styledMode: false,
                    type: 'pie'
                },

                title: {
                text: "Especies y Descendientes."
                },

                xAxis: {
                },

                series: [{
                type: 'pie',
                allowPointSelect: true,
                keys: ['name', 'y'],
                data: data_final,
                showInLegend: true

                }]
                });
        }
        else{
            console.log("Error receiving data from Biodiversidad api.");
        }

    }

    async function loadNewyorkDataGraph(){

       
        const res = await fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=technology&api-key=AGiOBlE3f6MtzK2PnqtxfgbUz1NTGcii");
        
        let data_final=[];
        if(res.ok){
            let json = await res.json();
            let data = json;
            //console.log (data);
            for(let i = 0; i < data.response.docs.length; i++){
               
                data_final.push({name: data.response.docs[i].headline.main, y: data.response.docs[i].word_count});

            }
            //console.log(data_final);

            Highcharts.chart('new', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Número de Palabras de Articulos NYT'
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
                        text: 'Número de Palabras'
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
                            format: '{point.y: f} palabras'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y: f} palabras</b> <br/>'
                },

                series: [
                    {
                        name: "Artuculos",
                        colorByPoint: true,
                        data: data_final
                    }
                
                        
                    ]
                
            });

        }
        else{
            console.log("Error receiving data from Harvard api.");
        }
       

    }

    async function loadCoinDataGraph(){
       
       
        const res = await fetch("https://api.coinlore.net/api/tickers/?limit=20");

        let data_final=[];
        if(res.ok){
            let json = await res.json();
            let data = json;
           // console.log (data);
            for(let i = 0; i < data.data.length; i++){
               // console.log(data.data);
               // console.log(data.data[i].api_model);

                data_final.push({name:data.data[i].name , y: parseFloat(data.data[i].price_usd)});

            }
            console.log(data_final);
            
            Highcharts.chart('coin', {
                chart: {
                    type: 'variablepie'
                },
                title: {
                    text: 'Cambio Criptomoneda.'
                },
                tooltip: {
                    headerFormat: '',
                    pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                        'Precio: <b>{point.y} $</b><br/>' 
                },
                series: [{
                    minPointSize: 50,
                    innerSize: '50%',
                    zMin: 0,
                    name: 'Criptomonedas',
                    data: data_final,
                    showInLegend: true
                }]
            });
        
        } else{
            console.log("Error receiving data from Art Instirute Chicago api.");
        }
    }
    
    

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/data.js"></script>
    <script src="https://code.highcharts.com/modules/drilldown.js"></script>    
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/variable-pie.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraphs}></script>
</svelte:head>

<main>

    <b>Todas las APIs listadas son distintas, usadas una vez por gráfica mostrada, pulsando en el nombre se puede acceder a la documentación de dicha API.
    </b>

    <h1 class="titulo_API"><a href="https://www.gbif.org/developer/summary">GBIF(Global Biodiversity Information Facility) API</a></h1>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">Se muestra algunas especies y sus número de descendientes.
        </p>
      </figure>

      <h1 class="titulo_API"><a href="https://developer.nytimes.com/docs/articlesearch-product/1/overview">New York Times API</a></h1>
      <figure class="highcharts-figure">
        <div id="new"></div>
        <p class="highcharts-description">
          Se muestran algunos artículos del New York Times y el numero de palabras utilizadas.
        </p>
      </figure>

      <h1 class="titulo_API"><a href="https://aggregator-data.artic.edu/api/v1/artworks">CoinLore API</a></h1>
      <figure class="highcharts-figure">
        <div id="coin"></div>
        <p class="highcharts-description">
          Se muestran Algunas cripto monedas y su valor en dolares americanos por cada criptomoneda.
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