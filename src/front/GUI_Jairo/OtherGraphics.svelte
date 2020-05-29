<script>

    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";

    async function loadGraphs(){
        loadAgifyGraph();
        loadNationalizeGraph();
    }

    async function loadAgifyGraph(){

        const res = await fetch("https://api.agify.io/?name=jairo");
        const res_2 = await fetch("https://api.agify.io/?name=enrique");
        const res_3 = await fetch("https://api.agify.io/?name=lizeth");
        const res_4 = await fetch("https://api.agify.io/?name=juan");
        const res_5 = await fetch("https://api.agify.io/?name=david");
        const res_6 = await fetch("https://api.agify.io/?name=carlos");

        if(res.ok && res_2.ok && res_3.ok && res_4.ok && res_5.ok && res_6.ok){
            let data = [];
            let json = await res.json();

            data.push({name: json.name, data: [json.age]});

            json = await res_2.json();

            data.push({name: json.name, data: [json.age]});

            json = await res_3.json();

            data.push({name: json.name, data: [json.age]});

            json = await res_4.json();

            data.push({name: json.name, data: [json.age]});

            json = await res_5.json();

            data.push({name: json.name, data: [json.age]});

            json = await res_6.json();

            data.push({name: json.name, data: [json.age]});

            Highcharts.chart('agify', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Predicción de edad según nombre.'
                },
                series: data
            });

        }

    }

    async function loadNationalizeGraph(){
        const res = await fetch("https://api.nationalize.io/?name=Jairo");

        if(res.ok){
            let json = await res.json();

            let data = [];

            for(let i = 0; i < json.country.length; i++){
                data.push({name: json.country[i].country_id, y: json.country[i].probability});
            }

            Highcharts.chart('nationalize', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Probabilidad de nacionalidad para el nombre Jairo.'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer'
                    }
                },
                series: [{
                    colorByPoint: true,
                    data: data
                }]
            });

        }
        else{
            console.log("Error fetching data.");
        }

    }

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraphs}"></script>
</svelte:head>

<main>

    <h4 class="titulo_API"><a href="https://api.agify.io">PREDICT AGE API</a></h4>
    <b>API que predice la edad según el nombre.</b>
    <div id="agify"></div>

    <h4 class="titulo_API"><a href="https://api.nationalize.io/">PREDICT NACIONALITY API</a></h4>
    <b>API que predice la nacionalidad según el nombre.</b>
    <div id="nationalize"></div>

    <Button outline color = "secondary" on:click="{pop}">Volver</Button>

</main>

<style>
    .titulo_API{
        margin-top: 50px;
    }
</style>