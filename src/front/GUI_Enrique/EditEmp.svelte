<script>
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { 
        onMount 
    } from "svelte";
    import { 
        pop 
    } from "svelte-spa-router";
    import { Alert } from "sveltestrap/src";

    const base_API_URL = "/api/v2";
    
    export let params = {};
    let emp = {};
    let updatedCountry = "";
    let updatedYear = 0;
    let updatedEmp_female_age15_24 = 0.0;
    let updatedEmp_male_age15_24 = 0.0;
    let updatedEmp_vuln_female = 0.0;
    let updatedEmp_vuln_male = 0.0;
    let errorMsg = "";

    var titulo = "";
    var campo = "";
    var color_alert = "";
    var visible_alert = false;

    onMount(getEmp);

	async function getEmp(){
		
        console.log("Fetching resource...");
		const res = await fetch(base_API_URL+"/emp-stats/" + params.country + "/" + params.year);

		if(res.ok){
            
            console.log("Ok:");
			const json = await res.json();
            emp = json;
            updatedCountry = emp.country;
            updatedYear = emp.year;
            updatedEmp_female_age15_24 = emp.emp_female_age15_24;
            updatedEmp_male_age15_24 = emp.emp_male_age15_24;
            updatedEmp_vuln_female = emp.emp_vuln_female;
            updatedEmp_vuln_male = emp.emp_vuln_male;
            console.log("Received resource.");
        
        }else{
			console.log("ERROR!" +  errorMsg);
		}
	}

    async function updateEmp(){
        console.log("Updating resource...");

        const res = await fetch(base_API_URL+"/emp-stats/" + params.country + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                country : params.country,
                year : parseInt(params.year),
                emp_female_age15_24 : parseFloat(updatedEmp_female_age15_24),
                emp_male_age15_24 : parseFloat(updatedEmp_male_age15_24),
                emp_vuln_female : parseFloat(updatedEmp_vuln_female),
                emp_vuln_male : parseFloat(updatedEmp_vuln_male)
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            if(res.ok){
                titulo = "¡Correcto!";    
                campo = "El recurso con país "+ params.country + " y año " + params.year + " se ha actualizado.";
                color_alert = "success";
                visible_alert = true;
                     
                setTimeout(function (){
					getEmp();
				}, 1000);
            }else{
                if(res.status == 400){
                
                    titulo = "¡Error!";
                    campo = "¡Todos los campos deben de estar rellenos bien, es decir, con un porcentaje!";
                    color_alert = "danger";
                    visible_alert = true;
                }
            }
            
        });

    }
</script>

<main>
    <h3>Editando el recurso con país <strong>{params.country}</strong> y año <strong> {params.year}</strong></h3>
    {#await emp}
		Loading resource...
    {:then emp}

    <Alert color="{color_alert}" isOpen={visible_alert} toggle={() => (visible_alert = true)}>
		{titulo}
		{campo}
	</Alert>
    
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
                <td>{updatedCountry}</td>
                <td>{updatedYear}</td>
                <td><input bind:value="{updatedEmp_female_age15_24}"></td>
                <td><input bind:value="{updatedEmp_male_age15_24}"></td>
                <td><input bind:value="{updatedEmp_vuln_female}"></td>
                <td><input bind:value="{updatedEmp_vuln_male}"></td>
                <td><Button outline color="primary" on:click="{updateEmp}">Editar</Button></td>
            </tr>
        </tbody>
    </Table>
    {/await}
    
    <Button outline color = "secondary" on:click="{pop}">Volver</Button>

</main>