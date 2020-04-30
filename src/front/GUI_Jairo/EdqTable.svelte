<script>
    import {
		onMount
	} from "svelte";

	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import {pop} from "svelte-spa-router";
    
    let data = [];
    const BASE_API_URL = "/api/v1";
    let new_data = {
        country: "",
        year: 0,
        edq_sg: 0.0,
        edq_gee: 0.0,
        edq_ptr: 0.0
    };

    onMount(getData);

    async function getData(){
        console.log("Fetching data...");
        const res = await fetch(BASE_API_URL+"/edq-stats");

        if(res.ok){
			console.log("OK");
			const json = await res.json();
			data = json;
			console.log("Received "+data.length+" data.");
		}
		else{
			console.log("ERROR!");
        }
        
    }

    async function insertEdq(){
        console.log("Inserting data...");

        let new_edq_data = {
            country: new_data.country,
            year: parseInt(new_data.year),
            edq_sg: parseFloat(new_data.edq_sg),
            edq_gee: parseFloat(new_data.edq_gee),
            edq_ptr: parseFloat(new_data.edq_ptr),
        }

        const res = await fetch("/api/v1/edq-stats", {
			method: "POST",
			body: JSON.stringify(new_edq_data),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function (res) {
			getData();
		});

    }

    async function deleteEdq(country, year){
		
        console.log("Deleting data...");

		const res = await fetch("/api/v1/edq-stats/" + country + "/" + year, {
			method: "DELETE",
		}).then(function (res) {
			getData();
		});

	}

</script>

<main>

	{#await data}
		Loading data...
	{:then data}

	<Button outline color = "secondary" on:click="{pop}">Back</Button>

	<h2><strong>edq_stats</strong></h2>

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
				<td><input bind:value="{new_data.country}"></td>
				<td><input bind:value="{new_data.year}"></td>
                <td><input bind:value="{new_data.edq_sg}"></td>
                <td><input bind:value="{new_data.edq_gee}"></td>
                <td><input bind:value="{new_data.edq_ptr}"></td>
				<td><Button color="success"  on:click="{insertEdq}">Insert</Button></td>
			</tr>
			{#each data as dato}
			<tr>
				<td><a href="#/edq-stats/{dato.country}/{dato.year}">{dato.country}</a></td>
				<td><a href="#/edq-stats/{dato.country}/{dato.year}">{dato.year}</a></td>
                <td>{dato.edq_sg}</td>
                <td>{dato.edq_gee}</td>
                <td>{dato.edq_ptr}</td>
				<td><Button color="danger" on:click="{deleteEdq(dato.country, dato.year)}">Delete</Button></td>
			</tr>
			{/each}
		</tbody>
	</Table>
	{/await}

	<Button outline color = "secondary" on:click="{pop}">Back</Button>
</main>