<script>
    import {
		onMount
	} from "svelte";

	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import Alert from "sveltestrap/src/Alert.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap/src';

	import {pop} from "svelte-spa-router";
    
    let data = [];
    const BASE_API_URL = "/api/v1";
    let new_data = {
        country: "",
        year: "",
        edq_sg: "",
        edq_gee: "",
        edq_ptr: ""
    };
	let alerta_visible = false; //Utilizo la variable para esconder o mostrar la alerta.
	let titulo_alerta = ""; //Escribo el mensaje que quiero enseñar en la alerta.
	let descr_alerta = ""; //Mensaje descriptivo en la alerta.
	let alert_color = ""; //Variable para cambiar el color de la alerta.
	let offset = 0; //Utilizo la variable para cambiar el offset en las peticiones.
	let offset_busqueda = 0; //Utilizo la variable para cambiar el offset en las peticiones al realizar una búsqueda.
	let offset_maximo = 0; //Lo utilizo para comprobar el length de data y no sobrepasar ese número en el offset.
	let busqueda = 0; //Compruebo si estoy en una búsqueda para tener en cuenta el offset correspondiente.
	let url_filtro = "";

    onMount(getData);

    async function getData(){
		console.log("Fetching data...");
		const res = await fetch(BASE_API_URL+"/edq-stats");
		busqueda = 0;

        if(res.ok){

			const json = await res.json();
			data = json;

			if(data.length > 0){
				const res = await fetch(BASE_API_URL+"/edq-stats?offset="+offset+"&limit=10");

				const json = await res.json();
				data = json;
				console.log("Received "+data.length+" data.");
			}
			else{
				const res = await fetch(BASE_API_URL+"/edq-stats");

				const json = await res.json();
				data = json;
				console.log("Received "+data.length+" data.");
			}

			
		}
		else{
			console.log("ERROR!");
			let titulo_alerta = "";
			let descr_alerta = "";
			alerta_visible = true;
			alert_color = "danger";
        }
        
    }

    async function insertEdq(){
        console.log("Inserting data...");

        let new_edq_data = {
            country: new_data.country,
            year: parseInt(new_data.year),
            edq_sg: parseFloat(new_data.edq_sg),
            edq_gee: parseFloat(new_data.edq_gee),
            edq_ptr: parseFloat(new_data.edq_ptr)
		}
		

		console.log(new_edq_data);

        const res = await fetch("/api/v1/edq-stats", {
			method: "POST",
			body: JSON.stringify(new_edq_data),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function (res) {

			if(res.status == 201){
				titulo_alerta = "Hecho.";
				descr_alerta = "Se ha introducido el dato: "+JSON.stringify(new_edq_data);
				alert_color = "success";
				alerta_visible = true;
				
			}
			else{
				titulo_alerta = "Error.";
				alert_color = "danger";
				descr_alerta = "";
				if(new_edq_data.country.localeCompare("") == 0 || isNaN(new_edq_data.year)){
					if(new_edq_data.country.localeCompare("") == 0){
						descr_alerta += " No ha introducido el país.";
					}
					if(isNaN(new_edq_data.year)){
						descr_alerta += " No ha introducido el año.";
					}
					
				}
				if(isNaN(new_edq_data.edq_sg) || isNaN(new_edq_data.edq_gee) || isNaN(new_edq_data.edq_ptr)){
					console.log("ENTRO");
					descr_alerta += " Rellene todos los campos para introducir un dato.";
				}
				alerta_visible = true;
			}

			new_data.country = "";
			new_data.year = "";
			new_data.edq_sg = "";
			new_data.edq_gee = "";
			new_data.edq_ptr = "";

			getData();

		});


	}

	async function findEdq(){

		let search_data = {
            country: new_data.country,
            year: parseInt(new_data.year),
            edq_sg: parseFloat(new_data.edq_sg),
            edq_gee: parseFloat(new_data.edq_gee),
            edq_ptr: parseFloat(new_data.edq_ptr)
		}

		busqueda = 1;
		
		let search = {};

		if(search_data.country.localeCompare("") != 0){
			search["country"] = search_data.country;
			//console.log("Tengo COUNTRY");
		}
		if(!isNaN(search_data.year)){
			search["year"] = search_data.year;
			//console.log("Tengo YEAR");
		}
		if(!isNaN(search_data.edq_sg)){
			search["edq_sg"] = search_data.edq_sg;
			//console.log("Tengo EDQ_SG");
		}
		if(!isNaN(search_data.edq_gee)){
			search["edq_gee"] = search_data.edq_gee;
			//console.log("Tengo EDQ_GEE");
		}
		if(!isNaN(search_data.edq_ptr)){
			search["edq_ptr"] = search_data.edq_ptr;
			//console.log("Tengo EDQ_PTR");
		}


		//Concateno el string de filtro.	
		url_filtro = "";	
		offset_busqueda = 0;
		for(var clave in search){
			url_filtro += (clave+"="+search[clave]+"&");
		}

		const res = await fetch(BASE_API_URL+"/edq-stats?limit=10&offset=0&"+url_filtro);

		
		if(res.status == 200){
			const json = res.json();
			data = json;

			titulo_alerta = "Hecho.";
			descr_alerta = "Se ha encontrado el dato con los parámetros: "+JSON.stringify(search_data);
			alert_color = "success";
			alerta_visible = true;
		}
		else{
			titulo_alerta = "Error.";
			descr_alerta = "No se ha podido encontrar el dato con los parámetros: ";
			if(search_data.country.localeCompare("") != 0){
				descr_alerta += " País: "+search_data.country;
			}
			if(!isNaN(search_data.year)){
				descr_alerta +=  " Año: "+search_data.year;
			}
			if(!isNaN(search_data.edq_sg)){
				descr_alerta += " edq_sg: "+search_data.edq_sg;
			}
			if(!isNaN(search_data.edq_gee)){
				descr_alerta += " edq_gee: "+search_data.edq_gee;
			}
			if(!isNaN(search_data.edq_ptr)){
				descr_alerta += " edq_ptr: "+search_data.edq_ptr;
			}

			alert_color = "danger";
			alerta_visible = true;
		}
	

	}

    async function deleteEdq(country, year){
		
        console.log("Deleting data...");

		const res = await fetch("/api/v1/edq-stats/" + country + "/" + year, {
			method: "DELETE",
		}).then(function (res){

			if(res.status == 200){

				titulo_alerta = "Hecho.";
				descr_alerta = "Se ha borrado el dato: "+country+"/"+year;
				alert_color = "success";
				alerta_visible = true;

				
			}
			else{
				titulo_alerta = "Error.";
				descr_alerta = "No se ha podido borrar el dato especificado.";
				alert_color = "danger";
				alerta_visible = true;
			}

			getData();
			
		});
		

	}

	async function deleteAllData(){

		console.log("Deleting data...");

		const res = await fetch("/api/v1/edq-stats", {
			method: "DELETE",
		}).then(function (res){

			if(res.status == 200){
				titulo_alerta = "Hecho.";
				descr_alerta = "Se han borrado todos los datos.";
				alert_color = "success";
				alerta_visible = true;

				getData();
			}
			else{
				titulo_alerta = "Error.";
				descr_alerta = "No se han podido borrar los datos.";
				alert_color = "danger";
				alerta_visible = true;
			}

			
		});

	}

	async function loadInitialData(){
		
		await deleteAllData();
		const res = await fetch(BASE_API_URL+"/edq-stats/loadInitialData");


        if(res.status == 200){
			console.log("Fetching initial data...");

			const res = await fetch(BASE_API_URL+"/edq-stats?limit=10&offset=1");

			const json = await res.json();
			data = json;

			titulo_alerta = "Hecho.";
			descr_alerta = "Se han cargado los datos iniciales.";
			alert_color = "success";
			alerta_visible = true;

			getData();

		}
		else{
			console.log("ERROR FETCHING INIDIAL DATA!");

			titulo_alerta = "Error.";
			descr_alerta = "No se han podido cargar los datos iniciales.";
			alert_color = "danger";
			alerta_visible = true;
        }
		

	}

	async function aumentaOffset(){
		let data_busqueda = "";
		let json = "";
		let res = "";

		console.log("BUSQUEDA: "+busqueda);

		if(busqueda == 1){

			data_busqueda = await fetch(BASE_API_URL+"/edq-stats?"+url_filtro);

			json = await data_busqueda.json();
			offset_maximo = json.length-1;

			if((offset_busqueda+10) <= offset_maximo){
				offset_busqueda += 10;
				res = await fetch(BASE_API_URL+"/edq-stats?offset="+offset_busqueda+"&limit=10&"+url_filtro);

				json = await res.json();
				data = json;
			}
			else{
				console.log("Estamos en la última página.")
			}
		}
		else{
			data_busqueda = await fetch(BASE_API_URL+"/edq-stats");
			
			json = await data_busqueda.json();
			offset_maximo = json.length-1;

			if((offset+10) <= offset_maximo){
				offset += 10;
				res = await fetch(BASE_API_URL+"/edq-stats?offset="+offset+"&limit=10");

				json = await res.json();
				data = json;
			}
			else{
				console.log("Estamos en la última página.")
			}
		}

		
		
	
	}

	async function disminuyeOffset(){
		let res = "";
		let json = "";

		if(busqueda == 1){
			if((offset_busqueda-10) >= 0){
				offset_busqueda -= 10;
				res = await fetch(BASE_API_URL+"/edq-stats?offset="+(offset_busqueda)+"&limit=10&"+url_filtro);

				json = await res.json();
				data = json;
			}
			else{
				console.log("Estamos en la primera página.");
			}
		}
		else{
			if((offset-10) >= 0){
				offset -= 10;
				res = await fetch(BASE_API_URL+"/edq-stats?offset="+(offset)+"&limit=10");

				json = await res.json();
				data = json;
			}
			else{
				console.log("Estamos en la primera página.");
			}
		}

		

	}




</script>

<main>

	{#await data}
		Loading data...
	{:then data}

	<h2><strong>Education quality stats</strong></h2>


	<Alert id="alerta" color={alert_color} isOpen={alerta_visible} toggle={() => (alerta_visible = false)}>
		<h4>{titulo_alerta}</h4>
		<p>{descr_alerta}</p>
	</Alert>

	<div id="buttons"  class="text-center">
		<Button color="primary" on:click="{loadInitialData}">Cargar recursos iniciales</Button>
		<Button color="primary" on:click="{getData}">Ver recursos actuales</Button>
		<Button color = "danger" on:click="{deleteAllData}">Borrar todos los recursos</Button>
	</div>
	


	<Table style="text-align: center;" class="table table-striped" bordered>
		<thead class="thead-dark">
			<tr>
				<th style="vertical-align: middle;">País</th>
				<th style="vertical-align: middle;">Año</th>
				<th style="vertical-align: middle;">Graduados en ciencia por 1000 habitantes</th>
                <th style="vertical-align: middle;">Gasto del gobierno en educación (billones)</th>
				<th style="vertical-align: middle;">Ratio de alumnos por profesor</th>
				<th style="vertical-align: middle;">Acciones</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="align-middle"><input bind:value="{new_data.country}"></td>
				<td class="align-middle"><input bind:value="{new_data.year}"></td>
                <td class="align-middle"><input bind:value="{new_data.edq_sg}"></td>
                <td class="align-middle"><input bind:value="{new_data.edq_gee}"></td>
                <td class="align-middle"><input bind:value="{new_data.edq_ptr}"></td>
				<td class="align-middle">
					<Button color="success"  on:click="{insertEdq}">Añadir</Button>
					<Button color="primary"  on:click="{findEdq}">Buscar</Button>
				</td>
			</tr>
			{#each data as dato}
			<tr>
				<td class="align-middle"><a href="#/edq-stats/{dato.country}/{dato.year}">{dato.country}</a></td>
				<td class="align-middle"><a href="#/edq-stats/{dato.country}/{dato.year}">{dato.year}</a></td>
                <td class="align-middle">{dato.edq_sg}</td>
                <td class="align-middle">{dato.edq_gee}</td>
                <td class="align-middle">{dato.edq_ptr}</td>
				<td class="align-middle"><Button color="danger" on:click="{deleteEdq(dato.country, dato.year)}">Borrar</Button></td>
			</tr>
			{/each}
		</tbody>
	</Table>
	
	{/await}

	<Button outline color = "primary" on:click="{disminuyeOffset}">Página Anterior</Button>
	<Button outline color = "primary" on:click="{aumentaOffset}">Página Siguiente</Button>

	<Button outline color = "secondary" on:click="{pop}">Volver</Button>
</main>

