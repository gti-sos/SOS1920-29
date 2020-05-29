<script>
import Button from "sveltestrap/src/Button.svelte";

    const BASE_API_URL = "/api/v2";

    async function loadGraph(){

        var config = {
            headers: {
                "x-rapidapi-host": "free-nba.p.rapidapi.com",
                "x-rapidapi-key": "b115b110f9msh3c44b9cf6127682p113503jsn8dc5c47240f8",
                "useQueryString": true
            },
            query: {
                "page": "0",
	            "per_page": "10"
            }
        };

        const res = await fetch("/free-nba.p.rapidapi.com", config);

        if(res.ok){
            console.log("Hola");
            
            let json = await res.json();
            let data_numbers = json;

           // console.log(JSON.stringify(data_numbers,null,2));
            let data_numbers_array = Object.values(data_numbers)
            //console.log(JSON.stringify(data_numbers_array[0],null,2));
            data_numbers_array.forEach( (e) => {
                console.log(JSON.stringify(e[0],null,2));
                
            });

        }else{
            console.log("No se ha podido acceder a la API");
        }

       
    }

    
</script>


<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/timeline.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<style>
    .highcharts-strong {
    font-weight: bold;
    }

    .highcharts-figure, .highcharts-data-table table {
        min-width: 320px; 
        max-width: 600px;
        margin: 1em auto;
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