<script>
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";
</script>

<main>
    <Table style="text-align: center;">
        <thead class="thead-dark">
            <tr>
                <th colspan="3" style="vertical-align: middle;">About</th>
            </tr>
            <tr>
                <th style="vertical-align: middle;">Enrique</th>
                <th style="vertical-align: middle;">Jairo</th>
                <th style="vertical-align: middle;">Lizeth</th>
            </tr>
        </thead>
        <tbody>

            <tr>
                <td><Button outline color="warning" href="#/about/emp_one">Integration 1</Button></td>
                <td><Button color="success" href="">Vídeo</Button></td>
                <td><Button color="danger" href="#/about/integration-one">Art Graphics</Button></td>
            </tr>

        </tbody>
    </Table>


    <Button outline color = "secondary" on:click="{pop}">Volver</Button>

</main>