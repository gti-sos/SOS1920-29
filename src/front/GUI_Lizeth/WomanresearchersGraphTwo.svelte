<script>
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    //import ApexCharts from 'apexcharts';


    async function loadGraph() {
       
        let MyData = [];
        //let MyDataWoman = [];
        

        const resData = await fetch("/api/v2/womanresearchers-stats");
        MyData = await resData.json();
        
       /* MyData.forEach( (x) => {
          MyDataWoman.push({name: x.year , data: [x.womanresearchers_he], pointPlacement: 'on'});
          //MyDataWoman.push({name: x.country, y:womanresearchers_he});
                       
        });*/

        let datos = []; 
        let recurso ="";
        console.log(MyData);

        MyData.forEach((x) => {
            //console.log(x);
            if(x.year == "2015"){
              recurso = x;
              if(datos.filter(dato => dato.name == recurso.country).length == 0){
                  datos.push({name:recurso.country, data: [x.womanresearchers_he, x.womanresearchers_gov , x.womanresearchers_bent]});
            }
          }
            
        });
        console.log(recurso);
        console.log(datos)
      

        console.log(datos);
       // console.log(countries);

       var options = {
          series: datos,
          chart: {
          height: 500,
          type: 'scatter',
          zoom: {
            enabled: true,
            type: 'xy'
          }
        },
        grid:{
          borderColor: 'black',
          row: {
            colors: ['white', 'white', 'white']
           },
           column: {
              colors: ['white', 'white', 'white']
           }
        },
         xaxis: {
          categories: ["Educaión Superior","Administacón","Negocios"],
                    
        },
        yaxis: {
          lines:{
            show:true
          },
          tickAmount: 10
        }
        };
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
        
    }
</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts" on:load="{loadGraph}"></script>

</svelte:head>

<main>

    <h1 style="text-align:center">Gráfica Investigadoras</h1>
    <h5 style="text-align:center">Investigadoras en distintos campos durante el año 2015</h5>
      <div id="chart"></div>
    <Button outline color="secondary" on:click="{pop}">Volver</Button>

</main>

<style>

</style>