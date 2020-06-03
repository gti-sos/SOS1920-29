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
                <td><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/6ToAwrNLIy8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></td>
                <td><iframe width="560" height="315" src="https://www.youtube.com/embed/ta3p2kVZCe8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></td>
            </tr>

        </tbody>
    </Table>


    <Button outline color = "secondary" on:click="{pop}">Volver</Button>

</main>