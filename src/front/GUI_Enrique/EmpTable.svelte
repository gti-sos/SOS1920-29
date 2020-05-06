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

	async function searchEmp(country, year, emp_female_age15_24, emp_male_age15_24, emp_vuln_female, emp_vuln_male){

		if(country == undefined && year == undefined && emp_female_age15_24 == undefined && emp_male_age15_24 == undefined && emp_vuln_female == undefined && emp_vuln_male == undefined){
			titulo = "¡Error!";
			campo = "Por favor escriba en algún campo para realizar la búsqueda.";
			color_alert = "danger";
			visible_alert = true;
		}else{
			
			if(country != undefined && year == undefined && emp_female_age15_24 == undefined && emp_male_age15_24 == undefined && emp_vuln_female == undefined && emp_vuln_male == undefined){
				const res = await fetch(base_API_URL+"/emp-stats?country=" + country);
				campo="";

				if(res.ok){
					const json = await res.json();
					emps = json;
					if(emps.length != 0){
						titulo = "¡Correcto!";
						campo = "Encontrado todos los países con nombre " + country;
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe un país con nombre " + country;
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}
			
			}else if(country == undefined && year != undefined && emp_female_age15_24 == undefined && emp_male_age15_24 == undefined && emp_vuln_female == undefined && emp_vuln_male == undefined){
				const res = await fetch(base_API_URL+"/emp-stats?year=" + year);
				if(res.ok){
					const json = await res.json();
					emps = json;
					campo="";
					if(emps.length != 0){
						titulo = "¡Correcto!";
						campo = "Encontrado todos los países con año " + year;
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe ningún país con año " + year;
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}
			
			}else if(country != undefined && year != undefined && emp_female_age15_24 == undefined && emp_male_age15_24 == undefined && emp_vuln_female == undefined && emp_vuln_male == undefined){
				const res = await fetch(base_API_URL+"/emp-stats?country=" + country + "&year=" + year);
				if(res.ok){
					const json = await res.json();
					emps = json;
					campo="";

					if(emps.length != 0){
						titulo = "¡Correcto!";
						campo = "Encontrado país " + country + " y año " + year;
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe un país con nombre " + country + " y año " + year ;
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}
			}else if(country != undefined && year != undefined && emp_female_age15_24 != undefined && emp_male_age15_24 == undefined && emp_vuln_female == undefined && emp_vuln_male == undefined){
				const res = await fetch(base_API_URL+"/emp-stats?country=" + country + "&year=" + year + "&emp_female_age15_24=" + emp_female_age15_24);
				if(res.ok){
					const json = await res.json();
					emps = json;
					campo="";

					if(emps.length != 0){
						titulo = "¡Correcto!";
						campo = "Encontrado país " + country + " año " + year + " y un % de Empleo Fem 15 a 24 años de " + emp_female_age15_24;
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe un país con nombre " + country + " año " + year + " un % de Empleo Fem 15 a 24 años de " + emp_female_age15_24;
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}
			}else if(country != undefined && year != undefined && emp_female_age15_24 != undefined && emp_male_age15_24 != undefined && emp_vuln_female == undefined && emp_vuln_male == undefined){
				const res = await fetch(base_API_URL+"/emp-stats?country=" + country + "&year=" + year + "&emp_female_age15_24=" + emp_female_age15_24 + "&emp_male_age15_24=" + emp_male_age15_24);
				if(res.ok){
					const json = await res.json();
					emps = json;
					campo="";

					if(emps.length != 0){
						titulo = "¡Correcto!";
						campo = "Encontrado país " + country + " año " + year + " un % de Empleo Fem 15 a 24 años de " + emp_female_age15_24 + " y un % de Empleo Masc 15 a 24 añosde  " + emp_male_age15_24;
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe un país con nombre " + country + " año " + year + " un % de Empleo Fem 15 a 24 años de " + emp_female_age15_24 + " y un % de Empleo Masc 15 a 24 años de " + emp_male_age15_24;
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}

		
			}else if(country != undefined && year != undefined && emp_female_age15_24 != undefined && emp_male_age15_24 != undefined && emp_vuln_female != undefined && emp_vuln_male == undefined){
				const res = await fetch(base_API_URL+"/emp-stats?country=" + country + "&year=" + year + "&emp_female_age15_24=" + emp_female_age15_24 + "&emp_male_age15_24=" + emp_male_age15_24 + "&emp_vuln_female=" + emp_vuln_female);
				if(res.ok){
					const json = await res.json();
					emps = json;
					campo="";

					if(emps.length != 0){
						titulo = "¡Correcto!";
						campo = "Encontrado país " + country + " año " + year + " % Empleo Fem 15 a 24 años de " + emp_female_age15_24 + " un % de Empleo Masc 15 a 24 años de " + emp_male_age15_24 + " y un % de Empleo Fem vulnerable de " + emp_vuln_female;
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe un país con nombre " + country + " año " + year + " un % de Empleo Fem 15 a 24 años de " + emp_female_age15_24 + " un % de Empleo Masc 15 a 24 años de " + emp_male_age15_24 + " y un % de Empleo Fem vulnerable de " + emp_vuln_female;
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}	
			}else if(country != undefined && year != undefined && emp_female_age15_24 != undefined && emp_male_age15_24 != undefined && emp_vuln_female != undefined && emp_vuln_male != undefined){
				const res = await fetch(base_API_URL+"/emp-stats?country=" + country + "&year=" + year + "&emp_female_age15_24=" + emp_female_age15_24 + "&emp_male_age15_24=" + emp_male_age15_24 + "&emp_vuln_female=" + emp_vuln_female + "&emp_vuln_male=" + emp_vuln_male);
				if(res.ok){
					const json = await res.json();
					emps = json;
					campo="";

					if(emps.length != 0){
						titulo = "¡Correcto!";
						campo = "Encontrado país " + country + " año " + year + " un % de Empleo Fem 15 a 24 años de " + emp_female_age15_24 + " un % de Empleo Masc 15 a 24 años de " + emp_male_age15_24 + " un % de Empleo Fem vulnerable de " + emp_vuln_female + " y un % de Empleo Masc vulnerable de " + emp_vuln_male;
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe un país con nombre " + country + " año " + year + " un % de Empleo Fem 15 a 24 años de " + emp_female_age15_24 + " un % de Empleo Masc 15 a 24 años de " + emp_male_age15_24 + " un % de Empleo Fem vulnerable de " + emp_vuln_female + " y un % de Empleo Masc vulnerable de " + emp_vuln_male;
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}	
			}else if(country == undefined && year == undefined && emp_female_age15_24 != undefined && emp_male_age15_24 == undefined && emp_vuln_female == undefined && emp_vuln_male == undefined){
				const res = await fetch(base_API_URL+"/emp-stats?emp_female_age15_24=" + emp_female_age15_24);
				if(res.ok){
					const json = await res.json();
					emps = json;
					campo="";

					if(emps.length != 0){
						titulo = "¡Correcto!";
						campo = "Encontrado país con un % de Empleo Fem 15 a 24 años de " + emp_female_age15_24;
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe un país con un % de Empleo Fem 15 a 24 años de " + emp_female_age15_24;
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}
			}else if(country == undefined && year == undefined && emp_female_age15_24 == undefined && emp_male_age15_24 != undefined && emp_vuln_female == undefined && emp_vuln_male == undefined){
				const res = await fetch(base_API_URL+"/emp-stats?emp_male_age15_24=" + emp_male_age15_24);
				if(res.ok){
					const json = await res.json();
					emps = json;
					campo = "";

					if(emps.length != 0){
						titulo = "¡Correcto!";
						campo = "Encontrado país con un % de Empleo Masc 15 a 24 años de " + emp_male_age15_24;
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe un país con un % de Empleo Fem 15 a 24 años de " + emp_female_age15_24;
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}
			}else if(country == undefined && year == undefined && emp_female_age15_24 == undefined && emp_male_age15_24 == undefined && emp_vuln_female != undefined && emp_vuln_male == undefined){
				const res = await fetch(base_API_URL+"/emp-stats?emp_vuln_female=" + emp_vuln_female);
				if(res.ok){
					const json = await res.json();
					emps = json;
					campo="";

					if(emps.length != 0){
						titulo = "¡Correcto!";
						campo = "Encontrado país con un % de Empleo Fem vulnerable de " + emp_vuln_female;
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe un país con un % de Empleo Fem vulnerable de " + emp_vuln_female;
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}
			}else if(country == undefined && year == undefined && emp_female_age15_24 == undefined && emp_male_age15_24 == undefined && emp_vuln_female == undefined && emp_vuln_male != undefined){
				const res = await fetch(base_API_URL+"/emp-stats?emp_vuln_male=" + emp_vuln_male);
				if(res.ok){
					const json = await res.json();
					emps = json;
					campo="";

					if(emps.length != 0){
						titulo = "¡Correcto!";
						campo = "Encontrado país con un % de Empleo Masc vulnerable de " + emp_vuln_male;
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe un país con un % de Empleo Masc vulnerable de " + emp_vuln_male;
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}
			}else if(country != undefined && year == undefined && emp_female_age15_24 != undefined && emp_male_age15_24 == undefined && emp_vuln_female == undefined && emp_vuln_male == undefined){
				const res = await fetch(base_API_URL+"/emp-stats?country=" + country + "&emp_female_age15_24="+emp_female_age15_24);
				if(res.ok){
					const json = await res.json();
					emps = json;

					if(emps.length != 0){
						titulo = "¡Correcto!";
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe ese recurso ";
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}
			}else if(country != undefined && year == undefined && emp_female_age15_24 == undefined && emp_male_age15_24 != undefined && emp_vuln_female == undefined && emp_vuln_male == undefined){
				const res = await fetch(base_API_URL+"/emp-stats?country=" + country + "&emp_male_age15_24="+emp_male_age15_24);
				if(res.ok){
					const json = await res.json();
					emps = json;

					if(emps.length != 0){
						titulo = "¡Correcto!";
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe ese recurso ";
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}
			}else if(country != undefined && year == undefined && emp_female_age15_24 == undefined && emp_male_age15_24 == undefined && emp_vuln_female != undefined && emp_vuln_male == undefined){
				const res = await fetch(base_API_URL+"/emp-stats?country=" + country + "&emp_vuln_female="+emp_vuln_female);
				if(res.ok){
					const json = await res.json();
					emps = json;

					if(emps.length != 0){
						titulo = "¡Correcto!";
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe ese recurso ";
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}
			}else if(country != undefined && year == undefined && emp_female_age15_24 == undefined && emp_male_age15_24 == undefined && emp_vuln_female == undefined && emp_vuln_male != undefined){
				const res = await fetch(base_API_URL+"/emp-stats?country=" + country + "&emp_vuln_male="+emp_vuln_male);
				if(res.ok){
					const json = await res.json();
					emps = json;

					if(emps.length != 0){
						titulo = "¡Correcto!";
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe ese recurso ";
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}
			}else if(country == undefined && year != undefined && emp_female_age15_24 == undefined && emp_male_age15_24 == undefined && emp_vuln_female == undefined && emp_vuln_male != undefined){
				const res = await fetch(base_API_URL+"/emp-stats?year=" + year + "&emp_vuln_male="+emp_vuln_male);
				if(res.ok){
					const json = await res.json();
					emps = json;

					if(emps.length != 0){
						titulo = "¡Correcto!";
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe ese recurso ";
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}
			}else if(country == undefined && year != undefined && emp_female_age15_24 != undefined && emp_male_age15_24 == undefined && emp_vuln_female == undefined && emp_vuln_male == undefined){
				const res = await fetch(base_API_URL+"/emp-stats?year=" + year + "&emp_female_age15_24="+emp_female_age15_24);
				if(res.ok){
					const json = await res.json();
					emps = json;

					if(emps.length != 0){
						titulo = "¡Correcto!";
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe ese recurso ";
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}
			}else if(country == undefined && year == undefined && emp_female_age15_24 != undefined && emp_male_age15_24 != undefined && emp_vuln_female == undefined && emp_vuln_male == undefined){
				const res = await fetch(base_API_URL+"/emp-stats?emp_female_age15_24=" + emp_female_age15_24 + "&emp_male_age15_24="+emp_male_age15_24);
				if(res.ok){
					const json = await res.json();
					emps = json;

					if(emps.length != 0){
						titulo = "¡Correcto!";
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe ese recurso ";
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
				}
			}else if(country == undefined && year == undefined && emp_female_age15_24 == undefined && emp_male_age15_24 == undefined && emp_vuln_female != undefined && emp_vuln_male != undefined){
				const res = await fetch(base_API_URL+"/emp-stats?emp_vuln_female=" + emp_vuln_female + "&emp_vuln_male="+emp_vuln_male);
				if(res.ok){
					const json = await res.json();
					emps = json;

					if(emps.length != 0){
						titulo = "¡Correcto!";
						color_alert = "success";
						visible_alert = true;
					}else{
						titulo = "¡Error!";
						campo = "No existe ese recurso ";
						color_alert = "danger";
						visible_alert = true;
						setTimeout(function (){
							getEmps();
						}, 4000);
					}
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
					}, 1000);
			
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
					}, 4000);
				}
				
			}else{
				
				titulo = "¡Error!";
				campo = "Ha habido un error";
				color_alert = "danger";
				visible_alert = true;
					
				
			}
		});

	}

	var actual_page = 0;

	async function nextPage(){

		const res = await fetch(base_API_URL+"/emp-stats");
		const json = await res.json();
		emps = json;
		
		if(offset + 10 <= emps.length){

			actual_page = actual_page + 1;
			offset = offset + 10;
			const res = await fetch(base_API_URL+"/emp-stats?limit=10&offset="+offset);
			const json = await res.json();
			emps = json;
			
		}
	}

	async function previousPage(){

		if(offset - 10 >= 0){
			
			actual_page = actual_page - 1;
			offset = offset - 10;
			const res = await fetch(base_API_URL+"/emp-stats?limit=10offset="+offset);

			const json = await res.json();
			emps = json;
		}
	}

	async function first_page(){
		const res = await fetch(base_API_URL+"/emp-stats?limit=10offset="+offset);

		const json = await res.json();
		emps = json;
		
	}

	async function last_page(){

		const res = await fetch(base_API_URL+"/emp-stats?limit=4offset="+offset);

		const json = await res.json();
		emps = json;
		
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
					<td><input bind:value="{searchEmp.country}"></td>
					<td><input bind:value="{searchEmp.year}"></td>
					<td><input bind:value="{searchEmp.emp_female_age15_24}"></td>
                    <td><input bind:value="{searchEmp.emp_male_age15_24}"></td>
                    <td><input bind:value="{searchEmp.emp_vuln_female}"></td>
                    <td><input bind:value="{searchEmp.emp_vuln_male}"></td>
					<td><Button outline color="warning" on:click="{searchEmp(searchEmp.country, searchEmp.year, searchEmp.emp_female_age15_24, searchEmp.emp_male_age15_24, searchEmp.emp_vuln_female, searchEmp.emp_vuln_male)}">Buscar</Button></td>
					
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

	<Pagination ariaLabel="Page navigation">
		
		
		{#if actual_page == 0}
		<PaginationItem disabled>
		  <PaginationLink previous href="#/emp-stats"/>
		</PaginationItem>
		{/if}

		{#if actual_page != 0}
		<PaginationItem disabled>
		  <PaginationLink previous href="#/emp-stats" on:click="{previousPage}"/>
		</PaginationItem>
		{/if}

		{#if actual_page == 0}
		<PaginationItem >
			<PaginationLink href="#/emp-stats" >1</PaginationLink>
		</PaginationItem>
		{/if}

		{#if actual_page == 1}
		<PaginationItem >
			<PaginationLink href="#/emp-stats" on:click="{previousPage}">1</PaginationLink>
		</PaginationItem>
		{/if}

		{#if actual_page == 2}
		<PaginationItem >
			<PaginationLink href="#/emp-stats" on:click="{first_page}">1</PaginationLink>
		</PaginationItem>
		{/if}

		{#if actual_page == 1}
		<PaginationItem >
			<PaginationLink href="#/emp-stats">2</PaginationLink>
		</PaginationItem>
		{/if}
		
		{#if actual_page == 2}
		<PaginationItem >
			<PaginationLink href="#/emp-stats" on:click="{previousPage}">2</PaginationLink>
		</PaginationItem>
		{/if}

		{#if actual_page == 0}
		<PaginationItem >
			<PaginationLink href="#/emp-stats" on:click="{nextPage}">2</PaginationLink>
		</PaginationItem>
		{/if}

		{#if actual_page == 0}
		<PaginationItem >
			<PaginationLink href="#/emp-stats" on:click="{last_page}">3</PaginationLink>
		</PaginationItem>
		{/if}

		{#if actual_page == 1}
		<PaginationItem >
			<PaginationLink href="#/emp-stats" on:click="{nextPage}">3</PaginationLink>
		</PaginationItem>
		{/if}

		{#if actual_page == 2}
		<PaginationItem >
			<PaginationLink href="#/emp-stats">3</PaginationLink>
		</PaginationItem>
		{/if}
		
		{#if actual_page == 2}
		<PaginationItem>
			<PaginationLink next href="#/emp-stats"/>
		</PaginationItem>
		{/if}

		{#if actual_page != 2}
		<PaginationItem>
			<PaginationLink next href="#/emp-stats" on:click="{nextPage}"/>
		</PaginationItem>
		{/if}
		
		  
	  </Pagination>

	  <Button outline color = "secondary" on:click="{pop}">Volver</Button>

</main>
