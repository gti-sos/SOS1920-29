<script>

    async function loadGraphs(){
        loadAgeOfEmpiresGraphic();
    }

    async function loadAgeOfEmpiresGraphic(){

        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        const res = await fetch(proxyurl+"https://age-of-empires-2-api.herokuapp.com/api/v1/structure/30");
        const res_2 = await fetch(proxyurl+"https://age-of-empires-2-api.herokuapp.com/api/v1/structure/32");
        const res_3 = await fetch(proxyurl+"https://age-of-empires-2-api.herokuapp.com/api/v1/structure/33");
        const res_4 = await fetch(proxyurl+"https://age-of-empires-2-api.herokuapp.com/api/v1/structure/34");

        if(res.ok && res_2.ok && res_3.ok && res_4.ok){
            let json = await res.json();
            let building_1 = json;

            json = await res_2.json();
            let building_2 = json;

            json = await res_3.json();
            let building_3 = json;

            json = await res_4.json();
            let building_4 = json;

            let names = [building_1.name,building_2.name,building_3.name,building_4.name];
            let data = [{name: names[0],data: [building_1.cost.Wood]},{name: names[1],data: [building_2.cost.Wood]},{name: names[2],data: [building_3.cost.Wood]},{name: names[3],data: [building_4.cost.Wood]}];

            console.log(data);
            console.log(names);

            Highcharts.chart('ageofempires', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Coste de oro de varias construcciones del juego.'
                },
                series: data
            });

        }
        else{
            console.log("Error fetching data.")
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

    <h4 class="titulo_API"><a href="https://age-of-empires-2-api.herokuapp.com/docs/">AGE OF EMPIRES 2 API</a></h4>
    <b>API con información sobre el videojuego Age of Empires 2.</b>
    <div id="ageofempires"></div>

</main>

<style>
    .titulo_API{
        margin-top: 50px;
    }
</style>