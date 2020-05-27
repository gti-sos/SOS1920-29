<script>
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
  //  import ApexCharts from 'apexcharts';


    async function loadGraph() {
       
        let MyData = [];
        //let MyDataWoman = [];
        

        const resData = await fetch("/api/v2/womanresearchers-stats");
        MyData = await resData.json();
        
       /* MyData.forEach( (x) => {
          MyDataWoman.push({name: x.year , data: [x.womanresearchers_he], pointPlacement: 'on'});
          //MyDataWoman.push({name: x.country, y:womanresearchers_he});
                       
        });*/

        let recurso = "";
        let datos = []; 
        let primer_anyo = 0; 
        let ultimo_anyo = 0; 


        MyData.sort(function (a,b){
            if (a.year > b.year) return 1;
            if (a.year < b.year) return -1;
            if(a.country.localeCompare(b.country) < 0) return -1;
            if(a.country.localeCompare(b.country) > 0) return 1;
        });
        console.log(MyData);

        primer_anyo = MyData[0].year;
        ultimo_anyo = MyData[MyData.length-1].year;

        let countries =[] ;

        MyData.forEach((x) => {
            //console.log(x);
            recurso = x;
            if(datos.filter(dato => dato.name == recurso.year).length == 0){
                datos.push({name:recurso.year, data: []});

                
            }
        });
        console.log(recurso);
        console.log(datos)
        datos.forEach((i)=>{
            for (let j=0;j<8;j++){
                i.data.push(MyData.filter(dato=> dato.year == i.name)[j].womanresearchers_he);
                i.data.push(MyData.filter(dato=> dato.year == i.name)[j].country);
                countries += ","+MyData.filter(dato=> dato.year == i.name)[j].country;
                
           }  
        });

        console.log(datos);
        console.log(countries);

        var options = {
          series: datos,
          chart: {
          height: 350,
          type: 'scatter',
          zoom: {
            type: 'xy'
          }
        },
        dataLabels: {
          enabled: false
        },
        grid: {
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          },
        },
        xaxis: {
          type: 'text',
        },
        yaxis: {

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