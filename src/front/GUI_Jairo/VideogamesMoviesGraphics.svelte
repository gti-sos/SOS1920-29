<script>

    async function loadGraphs(){
        loadAgeOfEmpiresGraphic();
        loadHearthstoneGraphic();
    }

    async function loadAgeOfEmpiresGraphic(){

        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        const res = await fetch(proxyurl+"https://age-of-empires-2-api.herokuapp.com/api/v1/structures");

        if(res.ok){

            let json = await res.json();
            let structures = json;

            let names = [];

            for(let i = 0; i < 15; i++){
                names.push(structures.structures[i].name);
            }

            let data = [];

            for(let i = 0; i < 15; i++){
                data.push({name: names[i], data: [structures.structures[i].cost.Wood]});
            }

            Highcharts.chart('ageofempires', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Coste de madera de varias construcciones del juego.'
                },
                series: data
            });

        }
        else{
            console.log("Error fetching data.")
        }


        
    }

    async function loadHearthstoneGraphic(){
        let headers = new Headers({"x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
	                                "x-rapidapi-key": "f3a73290d1mshd8f660509bd8628p1a0f3djsnf9b73d5d9c91",
	                                "useQueryString": true});

        let init = {method: 'GET',
                    headers: headers
                    };
        const res = await fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards?attack=3&health=4",init);

        if(res.ok){
            let json = await res.json();
            let cartas = json;


            let data = [];

            for(let i = 0; i < cartas["Rastakhan's Rumble"].length; i++){
                data.push({name: cartas["Rastakhan's Rumble"][i].name, data: [cartas["Rastakhan's Rumble"][i].cost]})
            }
            
            for(let i = 0; i < cartas["The Boomsday Project"].length; i++){
                data.push({name: cartas["The Boomsday Project"][i].name, data: [cartas["The Boomsday Project"][i].cost]})
            }


            Highcharts.chart('hearthstone', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Coste de varias cartas de ataque 3 y vida 4 del juego.'
                },
                series: data
            });
            

        }
        else{
            console.log("Error fetching data from Hearthstone API.");
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

    <h4 class="titulo_API"><a href="https://rapidapi.com/omgvamp/api/hearthstone">HEARTHSTONE API</a></h4>
    <b>API con información sobre el videojuego Hearthstone.</b>
    <div id="hearthstone"></div>

</main>

<style>
    .titulo_API{
        margin-top: 50px;
    }
</style>