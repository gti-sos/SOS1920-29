<script>
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import Alert from "sveltestrap/src/Alert.svelte";
    

    export let params = {};

    const BASE_API_URL="/api/v2";

    let womanresearchersData = {
       
    };

    console.log(womanresearchersData);
    

    let updateCountry = "";
    let updateYear = 0;
    let update_womanresearchers_he = 0;
    let update_womanresearchers_gov = 0;
    let update_womanresearchers_bent = 0;

    let alert_active = false; 
	let alert_title = ""; 
	let alert_description = ""; 
    let alert_color = "";

    onMount(getWomanResearcher);

    async function getWomanResearcher(){
        console.log("Fetching Women Researchers data...");

        const res = await fetch(BASE_API_URL+"/womanresearchers-stats/"+params.country+"/"+params.year);

        console.log(params.country);

        console.log(womanresearchersData)

        if(res.ok){
			const json = await res.json();
            womanresearchersData = json;

            updateCountry = womanresearchersData[0].country;
            updateYear = womanresearchersData[0].year;
            update_womanresearchers_he = womanresearchersData[0].womanresearchers_he;
            update_womanresearchers_gov = womanresearchersData[0].womanresearchers_gov;
            update_womanresearchers_bent = womanresearchersData[0].womanresearchers_bent;


            console.log("Received resource.");
        
        }else{

			console.log("ERROR!" +  res.status + ": " + res.statusText);
		}

    }

    async function updateWomanresearcher(){
        console.log("Updating women researchers ...");

        const res = await fetch(BASE_API_URL+"/womanresearchers-stats/"+params.country+"/"+params.year, {
            method: "PUT",
            body: JSON.stringify({
                country : params.country,
                year :parseInt(params.year),
                womanresearchers_he : update_womanresearchers_he,
                womanresearchers_gov : update_womanresearchers_gov,
                womanresearchers_bent : update_womanresearchers_bent
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            if(res.ok){

                alert_active = true; 
	            alert_title = "Exito."; 
	            alert_description = "El dato "+params.country+ " "+ params.year+" ha sido modificado correctamente." ; 
                alert_color = "success";

                console.log(res.status + ": " + res.statusText);
            }else if (res.status == 400){
                alert_active = true; 
	            alert_title = "Error."; 
	            alert_description = "Debe rellenar todos los campos." ; 
                alert_color = "danger";
                console.log(res.status + ": " + res.statusText);
            }
            else{
                alert_active = true; 
	            alert_title = "Error."; 
	            alert_description = "El dato no se ha podido actualizar." ; 
                alert_color = "danger";

               
            }
        });


    }

</script>

<main>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <h3 style="margin-bottom: 40px;">Editar : <strong>{params.country}/{params.year}</strong></h3>

	
    
    <Alert id="alerta" color={alert_color} isOpen={alert_active} toggle="{() => (alert_active = false)}">
		<h4>{alert_title}</h4>
		<p>{alert_description}</p>
	</Alert>
    {#await  womanresearchersData}
        Loading woman data...
    {:then womanresearchersData}
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
				<td style="text-align: center;">{updateCountry}</td>
				<td style="text-align: center;">{updateYear}</td>
                <td style="text-align: center;"><input type="number" bind:value="{update_womanresearchers_he}"></td>
                <td style="text-align: center;"><input type="number" bind:value="{update_womanresearchers_gov}"></td>
                <td style="text-align: center;"><input  type="number" bind:value="{update_womanresearchers_bent}"></td>
				<td style="text-align: center;"><Button color="success"  on:click="{updateWomanresearcher}"><i class="fa fa-edit" aria-hidden="true"></i>Actualizar</Button></td>
			</tr>
		</tbody>
	</Table>
    {/await}
    
    <Button outline color = "secondary" on:click="{pop}"><i class="fa fa-arrow-left" aria-hidden="true"></i>Volver</Button>

</main>