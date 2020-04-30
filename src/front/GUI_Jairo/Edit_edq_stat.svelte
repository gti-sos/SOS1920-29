<script>

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router";

    export let params = {};
    let data = {};
    let updatedCountry = "";
    let updatedYear = 2000;
    let updated_edq_sg = 0.0;
    let updated_edq_gee = 0.0;
    let updated_edq_ptr = 0.0;
    let errorMsg = "";

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
                year : updatedYear,
                edq_sg : updated_edq_sg,
                edq_gee : updated_edq_gee,
                edq_ptr : updated_edq_ptr
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getStat();
        });

    }

</script>

<main>

    <h3>Edit <strong>edq_stat {params.country}/{params.year}</strong></h3>

	{#await data}
		Loading data...
	{:then data}

	<Table bordered>
		<thead>
			<tr>
				<th>Country</th>
				<th>Year</th>
				<th>edq_sg</th>
                <th>edq_gee</th>
                <th>edq_ptr</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>{data.country}</td>
				<td>{data.year}</td>
                <td><input bind:value="{updated_edq_sg}"></td>
                <td><input bind:value="{updated_edq_gee}"></td>
                <td><input bind:value="{updated_edq_ptr}"></td>
				<td><Button color="success"  on:click="{updateStat}">Update</Button></td>
			</tr>
		</tbody>
	</Table>
    {/await}
    
    <Button outline color = "secondary" on:click="{pop}">Back</Button>

</main>