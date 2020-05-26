<script>
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    async function loadGraph() {
       
        let MyData = [];
        let MyDataWoman = [];
        

        const resData = await fetch("/api/v2/womanresearchers-stats");
        MyData = await resData.json();
        
        MyData.forEach( (x) => {
          MyDataWoman.push({name: x.year , data: [x.womanresearchers_he], pointPlacement: 'on'});
          //MyDataWoman.push({name: x.country, y:womanresearchers_he});
                       
        });


        Highcharts.chart('container', {
              chart: {
                  type: 'bar'
              },
              title: {
                  text: 'Investigadoras en Educación Superior'
              },
             
              xAxis: {
                  categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
                  title: {
                      text: null
                  }
              },
              yAxis: {
                  min: 0,
                  title: {
                      text: 'Population (millions)',
                      align: 'high'
                  },
                  labels: {
                      overflow: 'justify'
                  }
              },
              tooltip: {
                  valueSuffix: ' millions'
              },
              plotOptions: {
                  bar: {
                      dataLabels: {
                          enabled: true
                      }
                  }
              },
              legend: {
                  layout: 'vertical',
                  align: 'right',
                  verticalAlign: 'top',
                  x: -40,
                  y: 80,
                  floating: true,
                  borderWidth: 1,
                  backgroundColor:
                      Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                  shadow: true
              },
              credits: {
                  enabled: false
              },
              series: MyDataWoman
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

    <h1 style="text-align:center">Gráfica Investigadoras</h1>
    
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            En la gráfica podemos observar el número de investigadoras en educación superior a lo largo de los años 2013,2014 y 2015 en paises europeos.
        </p>
      </figure>

    <Button outline color="secondary" on:click="{pop}">Volver</Button>

</main>

<style>
 .highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
    max-width: 800px;
    margin: 1em auto;
}

#container {
    height: 400px;
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