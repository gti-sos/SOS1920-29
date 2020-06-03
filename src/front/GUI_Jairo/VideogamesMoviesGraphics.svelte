<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";

    async function loadGraphs(){
        loadAgeOfEmpiresGraphic();
        loadHearthstoneGraphic();
        loadIGDBGraphic();
        loadStudioGhibliGraphic();
        loadMusicGraphic();
        loadFilmsGraphic();
        loadRickAndMortyGraph();
        loadTLOTRGraph();
        loadHarryPotterGraph();
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

    async function loadIGDBGraphic(){
        let headers = new Headers({"user-key": "c36c1bee1803203a994ab36da28bff39"});
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        let init = {method: 'POST',
                    headers: headers,
                    body: "fields name, rating; limit 500; search \"final fantasy\"; where rating >= 80; "
                    };
        const res = await fetch(proxyurl+"https://api-v3.igdb.com/games",init);

        if(res.ok){
            let json = await res.json();
            let lista_ff = json;

            let data = [];

            for(let i = 0; i < lista_ff.length; i++){
                data.push({name: lista_ff[i].name, data : [lista_ff[i].rating]});
            }

            Highcharts.chart('igdb', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Rating de varios juegos de la saga Final Fantasy.'
                },
                series: data
            });
            

        }
        else{
            console.log("Error fetching data from IGDB API.");
        }

    }

    async function loadStudioGhibliGraphic(){
        const res = await fetch("https://ghibliapi.herokuapp.com/films?fields=title,rt_score");

        if(res.ok){
            let json = await res.json();
            let films = json;

            let data = [];

            for(let i = 0; i < films.length; i++){
                //console.log(films[i].rt_score);
                data.push({name: films[i].title, data: [parseInt(films[i].rt_score)]});
            }

            //console.log(data);

            Highcharts.chart('studio_ghibli', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Rating de varias películas de Studio Ghibli.'
                },
                series: data
            });
        }
    }

    async function loadMusicGraphic(){
        
        let eminem_records = "https://musicbrainz.org/ws/2/artist/b95ce3ff-3d05-4e87-9e01-c97b66af13d4?inc=recordings&fmt=json";
        let joyner_records = "https://musicbrainz.org/ws/2/artist/cb862d76-90a8-4733-b8f6-69240d60d805?inc=recordings&fmt=json";

        const res_eminem = await fetch("https://musicbrainz.org/ws/2/artist/b95ce3ff-3d05-4e87-9e01-c97b66af13d4?inc=recordings&fmt=json");
        const res_joyner = await fetch("https://musicbrainz.org/ws/2/artist/cb862d76-90a8-4733-b8f6-69240d60d805?inc=recordings&fmt=json");


        if(res_eminem.ok && res_joyner){

            let json = await res_eminem.json();
            let lista_eminem = json.recordings;

            json = await res_joyner.json();
            let lista_joyner = json.recordings;

            let text = "";

            for(let i = 0; i < lista_eminem.length; i++){
                text += ' '+lista_eminem[i].title;
            }
            for(let i = 0; i < lista_joyner.length; i++){
                text += ' '+lista_joyner[i].title;
            }

            //Quitamos algunos caracteres.
            text = text.replace(/'|unknown|\/|\(|\)|interlude|’|\[|\]|freestyle/g,' ');

            let lines = text.split(/[,\. ]+/g);

            let data = Highcharts.reduce(lines, function (arr, word) {
                let obj = Highcharts.find(arr, function (obj) {
                    return obj.name === word;
                });
                if (obj) {
                    obj.weight += 1;
                } else {
                    obj = {
                        name: word,
                        weight: 1
                    };
                    arr.push(obj);
                }
                return arr;
            }, []);


            Highcharts.chart('music', {
                series: [{
                    type: 'wordcloud',
                    data: data,
                    name: 'Occurrences'
                }],
                title: {
                    text: 'Wordcloud de canciones de Eminem y Joyner Lucas.'
                }
            });


        }
        else{
            console.log("Error fetching data from MUSIC API");
        }
    }

    async function loadFilmsGraphic(){
        const res = await fetch("https://www.omdbapi.com/?apikey=a17bbc51&s=star+wars");

        if(res.ok){
            let json = await res.json();
            let star_wars_films = json;

            let data = [];

            for(let i = 0; i < star_wars_films.Search.length; i++){
                data.push({name: star_wars_films.Search[i].Title, data: [parseInt(star_wars_films.Search[i].Year)]});
            }

            Highcharts.chart('films', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Año de estreno de las películas de Star Wars.'
                },
                yAxis: {
                    title: {
                        text: 'Año de estreno'
                    }
                },
                series: data
            });


        }

    }

    async function loadRickAndMortyGraph(){
        const res = await fetch("https://rickandmortyapi.com/api/episode");

        if(res.ok){
            let json = await res.json();
            let lista_episodios = json.results;

            let data = [];

            for(let i = 0; i < lista_episodios.length; i++){
                data.push({name: lista_episodios[i].name, data: [lista_episodios[i].characters.length]});
            }

            Highcharts.chart('rick_and_morty', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Número de personajes que aparecen en los 20 primeros episodios de Rick and Morty.'
                },
                series: data
            });

        }
    }

    async function loadTLOTRGraph(){

        let headers = new Headers({"Authorization": "Bearer 8aL2LbtHgehh67y32wUf"});
        let init = {method: 'GET',
                    headers: headers};
        const res = await fetch("https://the-one-api.herokuapp.com/v1/movie",init);

        if(res.ok){
            let json = await res.json();
            let peliculas_tlotr = json.docs;

            let data = [];

            for(let i = 0; i < peliculas_tlotr.length; i++){
                data.push({name: peliculas_tlotr[i].name, y: peliculas_tlotr[i].runtimeInMinutes});
            }

            Highcharts.chart('tlotr', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Minutos de duración de las películas de El señor de los anillos'
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

    }

    async function loadHarryPotterGraph(){

        const res = await fetch("https://www.potterapi.com/v1/characters?key=$2a$10$UmWeGkwQXzBNrxLpxx6MLuy231qXdXSdC98r2LaferDl4UP93cgrG&house=Gryffindor");
        const res_2 = await fetch("https://www.potterapi.com/v1/characters?key=$2a$10$UmWeGkwQXzBNrxLpxx6MLuy231qXdXSdC98r2LaferDl4UP93cgrG&house=Ravenclaw");
        const res_3 = await fetch("https://www.potterapi.com/v1/characters?key=$2a$10$UmWeGkwQXzBNrxLpxx6MLuy231qXdXSdC98r2LaferDl4UP93cgrG&house=Hufflepuff");
        const res_4 = await fetch("https://www.potterapi.com/v1/characters?key=$2a$10$UmWeGkwQXzBNrxLpxx6MLuy231qXdXSdC98r2LaferDl4UP93cgrG&house=Slytherin");

        if(res.ok && res_2.ok && res_3.ok && res_4.ok){
            let json = await res.json();
            let lista_gryffindor = json;

            json = await res_2.json();
            let lista_ravenclaw = json;

            json = await res_3.json();
            let lista_hufflepuff = json;

            json = await res_4.json();
            let lista_slytherin = json;

            let data = [];

            data.push({name: 'Gryffindor', y: lista_gryffindor.length});
            data.push({name: 'Ravenclaw', y: lista_ravenclaw.length});
            data.push({name: 'Hufflepuff', y: lista_hufflepuff.length});
            data.push({name: 'Slytherin', y: lista_slytherin.length});

            Highcharts.chart('harry_potter', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Nº de personajes de la saga por casa.'
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

    }

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/wordcloud.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraphs}"></script>
</svelte:head>

<main>

    <p>Pulsando en el nombre de la API se puede acceder a la documentación correspondiente.</p>

    <h4 class="titulo_API"><a href="https://age-of-empires-2-api.herokuapp.com/docs/">AGE OF EMPIRES 2 API</a></h4>
    <b>API con información sobre el videojuego Age of Empires 2.</b>
    <div id="ageofempires"></div>

    <h4 class="titulo_API"><a href="https://rapidapi.com/omgvamp/api/hearthstone">HEARTHSTONE API</a></h4>
    <b>API con información sobre el videojuego Hearthstone.</b>
    <div id="hearthstone"></div>

    <h4 class="titulo_API"><a href="https://api-docs.igdb.com/#about">VIDEOGAMES API</a></h4>
    <b>API con información sobre videojuegos.</b>
    <div id="igdb"></div>

    <h4 class="titulo_API"><a href="https://ghibliapi.herokuapp.com/#section/Studio-Ghibli-API">STUDIO GHIBLI API</a></h4>
    <b>API con información sobre películas de Studio Ghibli.</b>
    <div id="studio_ghibli"></div>

    <h4 class="titulo_API"><a href="https://musicbrainz.org/doc/MusicBrainz_Documentation">MUSIC API</a></h4>
    <b>API con información sobre música.</b>
    <div id="music"></div>

    <h4 class="titulo_API"><a href="http://www.omdbapi.com/">FILMS API</a></h4>
    <b>API con información sobre películas.</b>
    <div id="films"></div>

    <h4 class="titulo_API"><a href="https://rickandmortyapi.com/">RICK AND MORTY API</a></h4>
    <b>API con información sobre la serie de Rick and Morty.</b>
    <div id="rick_and_morty"></div>

    <h4 class="titulo_API"><a href="https://the-one-api.herokuapp.com/documentation">THE LORD OF THE RINGS API</a></h4>
    <b>API con información sobre El señor de los anillos.</b>
    <div id="tlotr"></div>

    <h4 class="titulo_API"><a href="https://www.potterapi.com">HARRY POTTER API</a></h4>
    <b>API con información sobre Harry Potter.</b>
    <div id="harry_potter"></div>

    <Button outline color = "secondary" on:click="{pop}">Volver</Button>

</main>

<style>
    .titulo_API{
        margin-top: 50px;
    }
</style>