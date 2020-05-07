<script>

	import { 
		onMount 
	} from "svelte";
	import { 
        pop 
    } from "svelte-spa-router";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import { Alert } from "sveltestrap/src";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap/src';
	
	let emps = [];
	const base_API_URL = "/api/v2";
	var titulo = "";
	var campo = "";
	var color_alert = "";
	var visible_alert = false;
	var offset = 0;

	let newEmp = {
		country: "",
		year: "",
        emp_female_age15_24: "",
        emp_male_age15_24: "",
        emp_vuln_female: "",
        emp_vuln_male: "",
	};

	onMount(getEmps);

	async function getEmps(){
		
		console.log("Fetching resources...");
		const res = await fetch(base_API_URL+"/emp-stats");

		if(res.ok){

			console.log("Ok:");
			const json = await res.json();
			emps = json;
			
			if(emps.length == 0){
				titulo = "";
				campo = "No hay datos que mostrar, pruebe a pulsar el botón 'Cargar datos iniciales' o inserte un dato a mano.";
				color_alert = "danger";
				visible_alert = true;
			
			}else if(emps.length > 10){
				
				const res = await fetch(base_API_URL+"/emp-stats?limit=10&offset=" + offset)
					.then(async function(res){
						const json = await res.json();
						emps = json;
						titulo = "¡Correcto!";
						campo = "Estos son todos los datos obtenidos."
						color_alert = "success";
						visible_alert = true;
						
					});
				console.log("Received "+emps.length+" resources of employments.");
			
			}else if(10 >= emps.length > 0){
				
				const res = await fetch(base_API_URL+"/emp-stats?limit="+emps.length+"&offset=" + offset)
					.then(async function(res){
						const json = await res.json();
						emps = json;
						titulo = "¡Correcto!";
						campo = "Estos son todos los datos obtenidos."
						color_alert = "success";
						visible_alert = true;
						
					});
				console.log("Received "+emps.length+" resources of employments.");
			
			}
		}
	}

	async function insertEmp(){
		
        console.log("Inserting resource..." + JSON.stringify(newEmp));
        let newEmpUpdated = {
            country: newEmp.country,
            year: parseInt(newEmp.year),
            emp_female_age15_24: parseFloat(newEmp.emp_female_age15_24),
            emp_male_age15_24: parseFloat(newEmp.emp_male_age15_24),
            emp_vuln_female: parseFloat(newEmp.emp_vuln_female),
            emp_vuln_male: parseFloat(newEmp.emp_vuln_male),
        }

		const res = await fetch(base_API_URL+"/emp-stats", {
			method: "POST",
			body: JSON.stringify(newEmpUpdated),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function (res) {
			if(res.ok){
				
				titulo = "¡Correcto!";
				campo = "El dato con país " + newEmp.country + " y año " + newEmp.year + " se ha añadido correctamente.";
				color_alert = "success";
				visible_alert = true;
			
				newEmp.country = "";
				newEmp.year = "";
                newEmp.emp_female_age15_24 = "";
                newEmp.emp_male_age15_24 = "";
                newEmp.emp_vuln_female = "";
				newEmp.emp_vuln_male = "";
				setTimeout(function (){
					getEmps();
				}, 1000);
				
			}else{
				if(res.status == 409){
					
					titulo = "¡Error!";
					campo = "El dato con país " + newEmp.country + " y año " + newEmp.year + " ya está añadido. Pruebe con otro país o año diferente.";
					color_alert = "danger";
					visible_alert = true;
					
				}else if(res.status == 400){
					
					titulo = "¡Error!";
					campo = "Por favor rellene todos los campos bien.";
					color_alert = "danger";
					visible_alert = true;
				}
			}

		});

	}

	async function searchingEmp(){
		
        console.log("Searching resource..." + JSON.stringify(searchingEmp));
        let search_Emp = {
            country: searchingEmp.country,
            year: parseInt(searchingEmp.year),
            emp_female_age15_24: parseFloat(searchingEmp.emp_female_age15_24),
            emp_male_age15_24: parseFloat(searchingEmp.emp_male_age15_24),
            emp_vuln_female: parseFloat(searchingEmp.emp_vuln_female),
            emp_vuln_male: parseFloat(searchingEmp.emp_vuln_male),
		}

		if((search_Emp.country == undefined || search_Emp.country == "") && isNaN(search_Emp.year) && isNaN(search_Emp.emp_female_age15_24) && isNaN(search_Emp.emp_male_age15_24) && isNaN(search_Emp.emp_vuln_female) && isNaN(search_Emp.emp_vuln_male)){
			
			titulo = "¡Error!";
			campo = "Por favor, escriba en algún campo para realizar la búsqueda.";
			color_alert = "danger";
			visible_alert = true;

		}else{

			var filter_search = "?";
			var filter_array = new Object();

			for (const prop in search_Emp) {
				
				if(prop == "country"){
			
					if(search_Emp[prop] != undefined){
						filter_array.country = search_Emp[prop];
					}

				}if(prop == "year"){
					
					if(!isNaN(search_Emp[prop])){
						filter_array.year = search_Emp[prop]; 
					}
				
				}if(prop == "emp_female_age15_24"){
					
					if(!isNaN(search_Emp[prop])){
						filter_array.emp_female_age15_24 = search_Emp[prop]; 
					}
				
				}if(prop == "emp_male_age15_24"){
					
					if(!isNaN(search_Emp[prop])){
						filter_array.emp_male_age15_24 = search_Emp[prop]; 
					}
				
				}if(prop == "emp_vuln_female"){
					
					if(!isNaN(search_Emp[prop])){
						filter_array.emp_vuln_female = search_Emp[prop]; 
					}
				
				}if(prop == "emp_vuln_male"){
					
					if(!isNaN(search_Emp[prop])){
						filter_array.emp_vuln_male = search_Emp[prop]; 
					}
				}
			}

			console.log("Array Object: "+JSON.stringify(filter_array, null, 2));
			
			for (const data in filter_array){
				filter_search += (data + "=" + filter_array[data] + "&");
			}

			console.log("URL filtrada: "+filter_search);
			
			const res = await fetch(base_API_URL+"/emp-stats"+filter_search);
			
			if(res.ok){
				console.log("Ok:");
				const json = await res.json();
				emps = json;
				
				if(emps.length == 0){

					titulo = "¡Error!";
					campo = "El recurso que has buscado no existe en la base de datos, prueba a buscar con otros datos";
					color_alert = "danger";
					visible_alert = true;
					setTimeout(function (){
						getEmps();
					}, 3000);

				}else{
					titulo = "¡Correcto!";
					campo = "Encontrado el recurso con los siguientes valores " + JSON.stringify(search_Emp, null, 2);
					color_alert = "success";
					visible_alert = true;
				}
			}
		}
	}

	async function loadInitialData(){

		console.log("Loading resources...");

		const res = await fetch(base_API_URL+"/emp-stats/loadInitialData")
			.then(async function(res){
				if(res.ok){
					const res = await fetch(base_API_URL+"/emp-stats?limit=10&offset=1");
					const json = await res.json();
					emps = json;
					
					titulo = "¡Correcto!";
					campo = "Todos los datos han sido cargados correctamente.";
					color_alert = "success";
					visible_alert = true;
					
					console.log("Received "+emps.length+" resources of employments.");
					setTimeout(function (){
						getEmps();
					}, 2000);
			
				}else{
					
					titulo = "¡Error!";
					campo = "Ha habido un problema al cargar los datos.";
					color_alert = "danger";
					visible_alert = true;	
				}
			});

	}

	async function deleteEmp(country, year){
		
        console.log("Deleting resource...");

		const res = await fetch(base_API_URL+"/emp-stats/" + country + "/" + year, {
			method: "DELETE",
		}).then(function (res) {
			if(res.ok){
				
				titulo = "¡Correcto!";
				campo = "El recurso con país " + country + " y año " + year + " se ha borrado correctamente.";
				color_alert = "success";
				visible_alert = true;
			
				setTimeout(function (){
					getEmps();
				}, 1000);
			}else{
				if(res.status == 404){
					
					titulo = "¡Error!";
					campo = "El recurso con país " + {country} + " y año " + {year} + " no se ha podido borrar porque no se encuentra en la base de datos.";
					color_alert = "danger";
					visible_alert = true;
				}
			}
			
		});

	}

	async function deleteAllEmp(){

		console.log("Deleting all resources...");
		const res = await fetch(base_API_URL+"/emp-stats", {
			method: "DELETE",
		}).then(function (res) {
			if(res.ok){
				
				if(emps.length == 0){
					titulo = "¡Error!";
					campo = "No hay datos que borrar, la tabla está vacía.";
					color_alert = "danger";
					visible_alert = true;
				
				}else{
					titulo = "¡Correcto!";
					campo = "Todos los datos han sido borrados correctamente.";	
					color_alert = "success";
					visible_alert = true;
					
					setTimeout(function (){
						getEmps();
					}, 2000);
				}
				
			}else{
				
				titulo = "¡Error!";
				campo = "Ha habido un error";
				color_alert = "danger";
				visible_alert = true;
					
				
			}
		});

	}


	async function nextPage(){

		const res = await fetch(base_API_URL+"/emp-stats");
		const json = await res.json();
		
		if(offset + 10 <= json.length-1){

			offset = offset + 10;
			const res = await fetch(base_API_URL+"/emp-stats?limit=10&offset="+offset);
			const json = await res.json();
			emps = json;
			
		}
	}

	async function previousPage(){

		if(offset - 10 >= 0){
			
			offset = offset - 10;
			const res = await fetch(base_API_URL+"/emp-stats?limit=10&offset="+offset);

			const json = await res.json();
			emps = json;
		}
	}


</script>

<main>

	{#await emps}
		Loading resources...
	{:then emps}

	<h2><strong>Estadísticas de empleo en algunos países de Europa (en %)</strong></h2>

	<Alert color="{color_alert}" isOpen={visible_alert} toggle={() => (visible_alert = true)}>
		{titulo}
		{campo}
	</Alert>

	<Button outline color="primary" on:click="{loadInitialData}">Cargar datos iniciales</Button>
	<Button outline color="danger" on:click="{deleteAllEmp}">Borrar todos los datos</Button>

		<Table bordered>
			<thead>
				<tr>
					<th>País</th>
					<th>Año</th>
                    <th>% Empleo Fem de 15 a 24 años</th>
                    <th>% Empleo Masc de 15 a 24 años</th>
                    <th>% Empleo vulnerable Fem</th>
                    <th>% Empleo vulnerable Masc</th>   
					<th>Acción</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input bind:value="{searchingEmp.country}"></td>
					<td><input bind:value="{searchingEmp.year}"></td>
					<td><input bind:value="{searchingEmp.emp_female_age15_24}"></td>
                    <td><input bind:value="{searchingEmp.emp_male_age15_24}"></td>
                    <td><input bind:value="{searchingEmp.emp_vuln_female}"></td>
                    <td><input bind:value="{searchingEmp.emp_vuln_male}"></td>
					<td><Button outline color="warning" on:click="{searchingEmp}">Buscar</Button></td>
					
				</tr>			

				{#each emps as emp}
					<tr>
						<td>
							<a href="#/emp-stats/{emp.country}/{emp.year}">{emp.country}</a>
						</td>
						<td>{emp.year}</td>
                        <td>{emp.emp_female_age15_24}</td>
                        <td>{emp.emp_male_age15_24}</td>
                        <td>{emp.emp_vuln_female}</td>
                        <td>{emp.emp_vuln_male}</td>
						<td><Button outline color="danger" on:click="{deleteEmp(emp.country, emp.year)}">Borrar</Button></td>
					</tr>
				{/each}

				<tr>
					<td><input bind:value="{newEmp.country}"></td>
					<td><input bind:value="{newEmp.year}"></td>
                    <td><input bind:value="{newEmp.emp_female_age15_24}"></td>
                    <td><input bind:value="{newEmp.emp_male_age15_24}"></td>
                    <td><input bind:value="{newEmp.emp_vuln_female}"></td>
                    <td><input bind:value="{newEmp.emp_vuln_male}"></td>
					<td><Button outline color="primary" on:click="{insertEmp}">Añadir</Button></td>
				</tr>

			</tbody>
		</Table>
	{/await}

	<Button outline color="primary" on:click="{previousPage}">Anterior página</Button>
	<Button outline color="primary" on:click="{nextPage}">Siguiente página</Button>

	<Button outline color = "secondary" on:click="{pop}">Volver</Button>

</main>
