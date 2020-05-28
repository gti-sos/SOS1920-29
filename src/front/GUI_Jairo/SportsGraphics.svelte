<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";

    const BASE_API_URL = "/api/v1";

    async function loadGraphs(){
        loadGraphBalldontlie();
        loadFootballDataGraph();
    }

    async function loadGraphBalldontlie(){
        const temporada_1 = await fetch(BASE_API_URL+"/balldontlie/season_averages?season=2016&player_ids[]=237");
        const temporada_2 = await fetch(BASE_API_URL+"/balldontlie/season_averages?season=2017&player_ids[]=237");
        const temporada_3 = await fetch(BASE_API_URL+"/balldontlie/season_averages?season=2018&player_ids[]=237");

        if(temporada_1.ok && temporada_2.ok && temporada_3.ok){
            let json = await temporada_1.json();
            let data_season_1 = json;

            json = await temporada_2.json();
            let data_season_2 = json;

            json = await temporada_3.json();
            let data_season_3 = json;


            let seasons = [2016,2017,2018];
            let data = [];

            data.push(data_season_1.data);
            data.push(data_season_2.data);
            data.push(data_season_3.data);

            let averages = [];
            averages[0] = {name: 'PPP', data:[data[0][0].pts, data[1][0].pts, data[2][0].pts]};
            averages[1] = {name: 'RPP', data:[data[0][0].reb, data[1][0].reb, data[2][0].reb]};
            averages[2] = {name: 'APP', data:[data[0][0].ast, data[1][0].ast, data[2][0].ast]};


            Highcharts.chart('balldontlie_api', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Promedios de puntos, asistencias y rebotes de LeBron James entre las temporadas 2016-2018'
                },
                xAxis: {
                    categories: seasons
                },
                series: averages
            });


        }
        else{
            console.log("Error receiving data from balldontlie API.");
        }


    }


    async function loadFootballDataGraph(){
        let headers = new Headers({ 'X-Auth-Token': '82a48cd2413e4dbaac60410a62ca1d93' });
        let init = {method: 'GET',
                    headers: headers
                    };
        const res = await fetch("http://api.football-data.org/v2/competitions/PD/scorers",init);

        if(res.ok){
            let json = await res.json();
            let info_liga = json;

            let lista_goleadores = info_liga.scorers;

            let data_final = [];



            for(let i = 0; i < lista_goleadores.length; i++){
                data_final.push({name: lista_goleadores[i].player.name+" "+"("+lista_goleadores[i].team.name+")", y: lista_goleadores[i].numberOfGoals});
            }


            Highcharts.chart('football_data', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Top 10 goleadores liga española 2019-2020'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer'
                    }
                },
                series: [{
                    colorByPoint: true,
                    data: data_final
                }]
            });


        }
        else{
            console.log("Error receiving data from football-data api.");
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

    <b>Aunque aparezcan con nombres parecidos, todas las APIs que aparecen en el listado son distintas y solo se ha 
        utilizado una vez cada una para mostrar cada gráfica, pulsando en el nombre se puede acceder a la documentación correspondiente.
    </b>

    <h4 class="titulo_API"><a href="https://www.balldontlie.io/">BALLDONTLIE API</a></h4>
    <b>API sobre estadísticas NBA, integrada mediante proxy.</b>
    <div id="balldontlie_api"></div>

    <h4 class="titulo_API"><a href="https://www.football-data.org/documentation/api">FOOTBALL-DATA</a></h4>
    <b>API sobre estadísticas de fútbol.</b>
    <div id="football_data"></div>

    <h4 class="titulo_API"><a href="https://rapidapi.com/theapiguy/api/thesportsdb">THESPORTSDB</a></h4>
    <b>API sobre calendarios deportivos.</b>
    <div id="thesportsdb"></div>

    <h4 class="titulo_API"><a href="https://rapidapi.com/stroccoli/api/football-science">FOOTBALL SCIENCE</a></h4>
    <b>API sobre calendarios y resultados de fútbol.</b>
    <div id="football_science"></div>

    <h4 class="titulo_API"><a href="https://rapidapi.com/montanaflynn/api/fifa-world-cup">FIFA WORLD CUP API</a></h4>
    <b>API sobre los mundiales de fútbol.</b>
    <div id="fifa_world_cup"></div>

    <h4 class="titulo_API"><a href="https://olympicsapi.docs.apiary.io/#reference/olympics">OLYMPICS API</a></h4>
    <b>API sobre los juegos olímpicos.</b>
    <div id="olympics"></div>

    <h4 class="titulo_API"><a href="http://ergast.com/mrd/">F1 API</a></h4>
    <b>API sobre F1.</b>
    <div id="f1"></div>


    <Button outline color = "secondary" on:click="{pop}">Volver</Button>

</main>

<style>
    .titulo_API{
        margin-top: 50px;
    }
</style>