<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	
    import Input from "sveltestrap/src/Input.svelte";
	
	import Alert from "sveltestrap/src/Alert.svelte";


	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	
	let womanresearchersData = [];
	const BASE_API_URL="/api/v2";

    let newWomanresearchersData = {
        country: "",
		year: "",
		womanresearchers_he: "",
		womanresearchers_gov: "",
		womanresearchers_bent:""
	};
	let alert_active = false; 
	let alert_title = ""; 
	let alert_description = ""; 
	let alert_color = "";
	
	let offset = 0;
    let numberMaxObject = 10;//numero de objetos maximo por pagina
    
	let actualPage = 1; 
	let loadmoreData = true; 

    let search = "";
	let values = "";
	let object = "";
	
     
	
	onMount(getWomanresearchers);
	

    async function getWomanresearchers() {

        const res = await fetch(BASE_API_URL+"/womanresearchers-stats?offset=" + numberMaxObject * offset + "&limit=" + numberMaxObject);
        const resNextPage = await fetch(BASE_API_URL+"/womanresearchers-stats?offset="  + numberMaxObject * (offset + 1) + "&limit=" + numberMaxObject);
		console.log("Fetching Woman researchers data...");
		
        if (res.ok && resNextPage.ok) {

            const json = await res.json();
			const jsonNext = await resNextPage.json();
			
			womanresearchersData = json;
			
            if (jsonNext.length == 0) {
                loadmoreData = false;
            } else {
                loadmoreData = true;
            }
            console.log("Received " + womanresearchersData.length + "Woman researchers data.")
        } else {
			console.log("ERROR!");
			alert_active = true; 
			alert_title = "Error"; 
			alert_description = "error al cargar los datos"; 
			alert_color = "danger";
        }
	}
	
	function MaysPrimera(string){
  		return string.charAt(0).toUpperCase() + string.slice(1);
	}

    async function insertWomanresearchers() {
		loadmoreData = true;

		console.log("Inserting Woman researchers data...");

		let new_data = {
			country: MaysPrimera((newWomanresearchersData.country).toLowerCase()),
			year: parseInt(newWomanresearchersData.year),
			womanresearchers_he: parseInt(newWomanresearchersData.womanresearchers_he),
			womanresearchers_gov: parseInt(newWomanresearchersData.womanresearchers_gov),
			womanresearchers_bent: parseInt(newWomanresearchersData.womanresearchers_bent)
            
		}
		console.log(new_data);

        const res = await fetch(BASE_API_URL+"/womanresearchers-stats", {
            method: "POST",
            body: JSON.stringify(new_data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getWomanresearchers();
            object = new_data.country;
            if (res.ok) {
				
				alert_title = "Exito."; 
				alert_description = "El dato"+ JSON.stringify(new_data) +"se ha insertado con exito"; 
				alert_color = "success";
				alert_active = true; 
				console.log(res.status + ": " + res.statusText);
                
            } else if (res.status == 409) {
				 
				alert_title = "Error."; 
				alert_description = "Error! el dato "+new_data.country +" "+new_data.year +" ya existe "; 
				alert_color = "danger";
				alert_active = true;
				console.log(res.status + ": " + res.statusText);

            }else if (res.status == 400){
				 
				alert_title = "Error."; 
				alert_description = "Error! debe rellenar todos los campos"; 
				alert_color = "danger";
				alert_active = true;
				console.log(res.status + ": " + res.statusText);
                
            };
        });
    }
	async function findWomanresearcher(){	

		
        loadmoreData = false;

		let search_woman_data = {
            country:  MaysPrimera((newWomanresearchersData.country).toLowerCase()),
			year: parseInt(newWomanresearchersData.year),
			womanresearchers_he: parseInt(newWomanresearchersData.womanresearchers_he),
			womanresearchers_gov: parseInt(newWomanresearchersData.womanresearchers_gov),
			womanresearchers_bent: parseInt(newWomanresearchersData.womanresearchers_bent)  
		}

		console.log(search_woman_data);

		let search = {};
		let url_filter = "";

		
		if(search_woman_data.country != "" ){
			search["country"] = search_woman_data.country;
		}
		else if(!isNaN(search_woman_data.year)){search["year"] = search_woman_data.year;}
		if(search_woman_data.country != "" && !isNaN(search_woman_data.year)){
			search["country"] = search_woman_data.country;
			search["year"] = search_woman_data.year;
		}
		else if(search_woman_data.country != "" && !isNaN(search_woman_data.womanresearchers_he)){
			search["country"] = search_woman_data.country;
			search["womanresearchers_he"] = search_woman_data.womanresearchers_he;

		}
		else if(search_woman_data.country != "" && !isNaN(search_woman_data.womanresearchers_gov)){
			search["country"] = search_woman_data.country;
			search["womanresearchers_gov"] = search_woman_data.womanresearchers_gov;
		}
		else if(!isNaN(search_woman_data.year) && !isNaN(search_woman_data.womanresearchers_bent)){
			search["year"] = search_woman_data.year;
			search["womanresearchers_gov"] = search_woman_data.womanresearchers_bent;
		}
		else if(!isNaN(search_woman_data.year)&& !isNaN(search_woman_data.womanresearchers_he)){
			search["year"] = search_woman_data.year;
			search["womanresearchers_he"] = search_woman_data.womanresearchers_he;

		}
		else if(!isNaN(search_woman_data.year) && !isNaN(search_woman_data.womanresearchers_gov)){
			search["year"] = search_woman_data.year;
			search["womanresearchers_gov"] = search_woman_data.womanresearchers_gov;
		}
		else if(search_woman_data.year != "" && !isNaN(search_woman_data.womanresearchers_bent)){
			search["year"] = search_woman_data.year;
			search["womanresearchers_gov"] = search_woman_data.womanresearchers_bent;
		}
		else if(!isNaN(search_woman_data.womanresearchers_he)&& !isNaN(search_woman_data.womanresearchers_gov)){
			search["womanresearchers_he"] = search_woman_data.womanresearchers_he;
			search["womanresearchers_gov"] = search_woman_data.womanresearchers_gov;
		}
		else if(!isNaN(search_woman_data.womanresearchers_he) && !isNaN(search_woman_data.womanresearchers_bent)){
			search["womanresearchers_he"] = search_woman_data.womanresearchers_he;
			search["womanresearchers_gov"] = search_woman_data.womanresearchers_bent;
		}
		else if(!isNaN(search_woman_data.womanresearchers_he)){search["womanresearchers_he"] = search_woman_data.womanresearchers_he;}
		else if(!isNaN(search_woman_data.womanresearchers_gov)){search["womanresearchers_gov"] = search_woman_data.womanresearchers_gov;}
		else if(!isNaN(search_woman_data.womanresearchers_bent)){search["womanresearchers_bent"] = search_woman_data.womanresearchers_bent;}
		

		for(var key in search){
			
			if (url_filter=="country=&year=NaN&womanresearchers_he=NaN&womanresearchers_gov=NaN&womanresearchers_bent=NaN&"){
				url_filter=" ";
			}
			console.log(key);
			url_filter += (key+"="+search[key]+"&");
		}
		console.log(url_filter)
		
		const res = await fetch(BASE_API_URL+"/womanresearchers-stats?"+url_filter);



	//onsole.log(JSON.stringify(res.json()))
		
		if(res.ok && url_filter!=" " ){		

			const json = await res.json();
			womanresearchersData = json;

			

			/*alert_active = true; 
			alert_title = "Exito."; 
			
			alert_description = "Dato con los parámetros "+ search_woman_data.country+" "+search_woman_data.year+ " "+search_woman_data.womanresearchers_he
			+" "+search_woman_data.womanresearchers_gov+" "+search_woman_data.womanresearchers_bent+" encontrado."; 
			
			alert_color = "success";
			console.log(res.status + ": " + res.statusText);*/

			alert_title = "Exito."; 
			alert_description = womanresearchersData.length +" Datos encontrados con  "; 
			alert_color = "success";
			alert_active = true; 
			console.log(res.status + ": " + res.statusText);
			if(search_woman_data.country!= 0){alert_description += " País: "+search_woman_data.country;}
			if(!isNaN(search_woman_data.year)){alert_description +=  " Año: "+search_woman_data.year;}
			if(!isNaN(search_woman_data.womanresearchers_he)){alert_description += " : Educación superior "+search_woman_data.womanresearchers_he;}
			if(!isNaN(search_woman_data.womanresearchers_gov)){alert_description += " Administración: "+search_woman_data.womanresearchers_gov;}
			if(!isNaN(search_woman_data.womanresearchers_bent)){alert_description += " Negocios: "+search_woman_data.womanresearchers_bent;}
		} 

		
		
		else{
			
			alert_title = "Error."; 
			alert_description = "Dato no encontrado, rellenar los campos con datos validos."; 
			alert_color = "danger";
			alert_active = true; 
			console.log(res.status + ": " + res.statusText);
			if(search_woman_data.country!= 0){alert_description += " País: "+search_woman_data.country;}
			if(!isNaN(search_woman_data.year)){alert_description +=  " Año: "+search_woman_data.year;}
			if(!isNaN(search_woman_data.womanresearchers_he)){alert_description += " : Educación superior "+search_woman_data.womanresearchers_he;}
			if(!isNaN(search_woman_data.womanresearchers_gov)){alert_description += " Administración: "+search_woman_data.womanresearchers_gov;}
			if(!isNaN(search_woman_data.womanresearchers_bent)){alert_description += " Negocios: "+search_woman_data.womanresearchers_bent;}
					
		}
	

	}
	

    async function deleteWoman(country, year) {
		loadmoreData = true;

        console.log("Deleting Woman Researcher data...");
		const res = await fetch(BASE_API_URL+"/womanresearchers-stats/"+country+"/"+year, {
			method: "DELETE"
		}).then(function (res) {
            getWomanresearchers();
            if (res.ok) {
				alert_active = true; 
				alert_title = "Exito."; 
				alert_description = "Dato "+country +" "+ year+ " ha sido borrado correctamente."; 
				alert_color = "success";
				console.log(res.status + ": " + res.statusText);

            } else if (res.status == 404) {
				alert_active = true; 
				alert_title = "Error."; 
				alert_description = "Dato "+country +" "+ year+ " no se ha podido borrar el dato."; 
				alert_color = "success";
				console.log(res.status + ": " + res.statusText);
            };
		});
    }
    
    async function deleteAllWomans() {
		
		actualPage = 1; 
        loadmoreData = false;
		
	    console.log("Deleting All Woman Researcher data...");
		const res = await fetch(BASE_API_URL+"/womanresearchers-stats", {
			method: "DELETE"
		}).then(function (res) {
            getWomanresearchers();
            if (res.ok) {
				alert_active = true; 
				alert_title = "Exito."; 
				alert_description = "Los datos han sido borrados correctamente."; 
				alert_color = "success";
				console.log(res.status + ": " + res.statusText);

            };
		});
    }
    
    async function loadInitialData() {

		await deleteAllWomans();
		loadmoreData = true;
		
        const res = await fetch(BASE_API_URL+"/womanresearchers-stats/loadInitialData", {
            method: "GET"
        }).then(function (res) {
            getWomanresearchers();
            if (res.ok) {
				alert_active = true; 
				alert_title = "Exito."; 
				alert_description = "Los datos iniciales se han cargado correctamente."; 
				alert_color = "success";
				console.log(res.status + ": " + res.statusText);

            };
        });
    }
    
    async function upOffset (numPag) {
		offset += numPag;
		actualPage += numPag;
		getWomanresearchers();
	}

	
</script>

<main>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

	 {#await womanresearchersData}
        Loading Women Researchers...
	{:then womanresearchersData}
	
    <h2 style="text-align: center;"><strong> Mujeres Investigadoras</strong></h2>

	<Alert id="alerta" color={alert_color} isOpen={alert_active} toggle="{() => (alert_active = false)}">
		<h4>{alert_title}</h4>
		<p>{alert_description}</p>
	</Alert>

	<Button outline color="primary" on:click={loadInitialData} style="margin-bottom: 30px;margin-left: 39%;margin-right: 20px;margin-top: 40px;"><i class="fa fa-circle-o-notch fa-spin"></i> Cargar datos iniciales</Button>
	<Button outline color="danger" on:click={deleteAllWomans} style="margin-bottom: 30px; margin-top: 40px;"><i class="fa fa-trash-o" aria-hidden="true"></i> Borrar todo</Button>


        <Table bordered>
            <thead>
                <tr>
                    <th style="text-align: center;">País</th>
                    <th style="text-align: center;">Año</th>
                    <th style="text-align: center;">Investigadoras en Educación Superior</th>
                    <th style="text-align: center;">Investigadoras en Administración</th>
					<th style="text-align: center;">Investigadoras en Negocios</th>
					<th style="text-align: center;">Accion</th>

                    
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="background-color:lightgray ;text-align: center;"><input type="text" bind:value="{newWomanresearchersData.country}"></td>
                    <td style="background-color:lightgray ;text-align: center;"><input type="number" bind:value="{newWomanresearchersData.year}"></td>
                    <td style="background-color:lightgray ;text-align: center;"><input type="number" bind:value="{newWomanresearchersData.womanresearchers_he}"></td>
                    <td style="background-color:lightgray ;text-align: center;"><input type="number" bind:value="{newWomanresearchersData.womanresearchers_gov}"></td>
                    <td style="background-color:lightgray ;text-align: center;"><input type="number" bind:value="{newWomanresearchersData.womanresearchers_bent}"></td>
					<td style="background-color:lightgray ;text-align: center;"><Button  color="success" on:click={insertWomanresearchers}>Insertar</Button>
						<Button  color="primary" on:click={findWomanresearcher}><i class="fa fa-search" aria-hidden="true"></i>Buscar</Button>
					</td>
                </tr>
                {#each womanresearchersData as woman}
                    <tr>
                        <td style="text-align: center;"><a href="#/womanresearchers-stats/{woman.country}/{woman.year}">{woman.country}</a></td>
                        <td style="text-align: center;"><a href="#/womanresearchers-stats/{woman.country}/{woman.year}">{woman.year}</a></td>
                        <td style="text-align: center;">{woman.womanresearchers_he}</td>
                        <td style="text-align: center;">{woman.womanresearchers_gov}</td>
                        <td style="text-align: center;">{woman.womanresearchers_bent}</td>
                        <td style="text-align: center;"><Button outline color="danger" on:click="{deleteWoman(woman.country, woman.year)}"><i class="fa fa-trash-o" aria-hidden="true"></i> Borrar</Button></td>
                    </tr>
                {/each}
            </tbody>
        </Table>
    {/await}
    <Button outline color="secondary" on:click="{pop}"><i class="fa fa-arrow-left" aria-hidden="true"></i>Volver</Button>

	<Pagination ariaLabel="Cambiar de página" style="padding-left: 50%;">

        <PaginationItem class="{actualPage === 1 ? 'disabled' : ''}">
            <PaginationLink previous href="#/womanresearchers-stats" on:click="{() => upOffset(-1)}" />
        </PaginationItem>
        
        {#if actualPage != 1}
            <PaginationItem>
                <PaginationLink href="#/womanresearchers-stats" on:click="{() => upOffset(-1)}" >{actualPage - 1}</PaginationLink>
            </PaginationItem>
        {/if}
        <PaginationItem active>
            <PaginationLink href="#/womanresearchers-stats" >{actualPage}</PaginationLink>
        </PaginationItem>
        
        {#if loadmoreData}
            <PaginationItem >
                <PaginationLink href="#/womanresearchers-stats" on:click="{() => upOffset(1)}">{actualPage + 1}</PaginationLink>
            </PaginationItem>
        {/if}
        <PaginationItem class="{loadmoreData ? '' : 'disabled'}">
            <PaginationLink next href="#/womanresearchers-stats" on:click="{() => upOffset(1)}"/>
        </PaginationItem>  
    </Pagination>

</main>