<script>

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import Alert from "sveltestrap/src/Alert.svelte";
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router";

    export let params = {};
    let data = {};
    let updatedCountry = "";
    let updatedYear = 2000;
    let updated_edq_sg = 0.0;
    let updated_edq_gee = 0.0;
    let updated_edq_ptr = 0.0;
    let alerta_visible = false; //Utilizo la variable para esconder o mostrar la alerta.
	let titulo_alerta = ""; //Escribo el mensaje que quiero enseñar en la alerta.
	let descr_alerta = ""; //Mensaje descriptivo en la alerta
	let alert_color = "";

    onMount(getStat);

    async function getStat(){
        console.log("Fetching edq_stat...");
        const res = await fetch("/api/v1/edq-stats/" + params.country + "/" + params.year);

        if(res.ok){
			const json = await res.json();
            data = json;
            updatedCountry = params.country;
            updatedYear = params.year;
            updated_edq_sg = data.edq_sg;
            updated_edq_gee = data.edq_gee;
            updated_edq_ptr = data.edq_ptr;
            console.log("Received resource.");
        
        }else{
            errorMsg = res.status + ": " + res.statusText;
			console.log("ERROR!" +  errorMsg);
		}

    }

    async function updateStat(){
        console.log("Updating edq_stat...");

        const res = await fetch("/api/v1/edq-stats/" + params.country + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                country : updatedCountry,
                year : parseInt(updatedYear),
                edq_sg : parseInt(updated_edq_sg),
                edq_gee : parseInt(updated_edq_gee),
                edq_ptr : parseInt(updated_edq_ptr)
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            if(res.status == 200){
                titulo_alerta = "Hecho.";
                descr_alerta = "Se ha actualizado el dato: "+params.country+"/"+params.year;
                alert_color = "success";
                alerta_visible = true;
            }
            else{
                
                titulo_alerta = "Error.";
                descr_alerta = "No se ha podido actualizar el dato.";
                alert_color = "danger";
                alerta_visible = true;
            }
        });


    }

</script>

<main>

    <h3>Editar <strong>edq_stat {params.country}/{params.year}</strong></h3>

	{#await data}
		Loading data...
    {:then data}
    
    <Alert id="alerta" color={alert_color} isOpen={alerta_visible} toggle={() => (alerta_visible = false)}>
		<h4>{titulo_alerta}</h4>
		<p>{descr_alerta}</p>
	</Alert>

	<Table style="text-align: center;" class="table table-striped" bordered>
		<thead class="thead-dark">
			<tr>
				<th style="vertical-align: middle;">País</th>
				<th style="vertical-align: middle;">Año</th>
				<th style="vertical-align: middle;">Graduados en ciencias por 1.000 habitantes</th>
                <th style="vertical-align: middle;">Gasto del gobierno en educación (billones)</th>
                <th style="vertical-align: middle;">Ratio alumnos/profesor</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="align-middle">{data.country}</td>
				<td class="align-middle">{data.year}</td>
                <td class="align-middle"><input bind:value="{updated_edq_sg}"></td>
                <td class="align-middle"><input bind:value="{updated_edq_gee}"></td>
                <td class="align-middle"><input bind:value="{updated_edq_ptr}"></td>
				<td class="align-middle"><Button color="success"  on:click="{updateStat}">Actualizar</Button></td>
			</tr>
		</tbody>
	</Table>
    {/await}
    
    <Button outline color = "secondary" on:click="{pop}">Back</Button>

</main>