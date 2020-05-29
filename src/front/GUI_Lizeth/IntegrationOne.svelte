<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";


    async function loadGraphs(){

        loadCooperhewittDataGraph();
        loadHarvardDataGraph()
    }

    
    async function loadCooperhewittDataGraph(){
       
        const res = await fetch("https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.departments.getList&access_token=2d93e25a88d905caf314b8906b1a4fc5&page=1&per_page=100");

        let data_final=[];

        if(res.ok){
            let json = await res.json();
            let data = json;

            console.log (data);
            for(let i = 0; i < data.departments.length; i++){
                console.log(data.departments);
                console.log(data.departments[i].name);

                data_final.push({name: data.departments[i].name, y: parseInt(data.departments[i].count_objects), value1:false});

            }
            console.log(data_final);


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
            console.log (data);
            for(let i = 0; i < data.records.length; i++){
                console.log(data.records);
                console.log(data.records[i].name);

                data_final.push({name: data.records[i].name, y: data.records[i].objectcount});
                culture.push({name: data.records[i].name});

            }
            console.log(data_final);
            console.log(culture);

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

    <h4 class="titulo_API"><a href="https://collection.cooperhewitt.org/api/methods/cooperhewitt.departments.getList">Copper Hewitt Museo API</a></h4>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">Se muestra los distintos departamentos existentes y la cantidad de objetos que posee cada departamento.
        </p>
      </figure>

      <h4 class="titulo_API"><a href="https://github.com/harvardartmuseums/api-docs/blob/master/sections/culture.md">Harvard Art Museo API</a></h4>
      <figure class="highcharts-figure">
        <div id="hardvard"></div>
        <p class="highcharts-description">
          Se muestras las culturas usadas por Harvard Art museum para organizar los objetos y el número de estos.
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