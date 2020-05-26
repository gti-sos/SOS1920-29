<script>
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    async function loadGraph() {
       
        let MyData = [];
        let MyDataArray = [];
        let MyDataEmp = [];

        const resData = await fetch("/api/v2/womanresearchers_stats");
        MyData = await resData.json();
        
        MyData.forEach( (e) => {
            
            MyDataArray.push({name: e.country + " " + e.year, y: e.emp_vuln_female})
            MyDataEmp.push({name: 'Empleo vulnerable femenino', data: MyDataArray});
                       
        });

       
    }
</script>

<svelte:head>   
   
</svelte:head>

<main>

    <h1 style="text-align:center">Gráfica 1 </h1>

    <figure class="highcharts-figure">
    <div id="container"></div>
        <p class="highcharts-description">

        </p>
    </figure>

    <Button outline color="secondary" on:click="{pop}">Volver</Button>

</main>

<style>
   
</style>