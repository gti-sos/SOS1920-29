<script>
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";
</script>

<main>
    <Table style="text-align: center;">
        <thead class="thead-dark">
            <tr>
                <th colspan="3" style="vertical-align: middle;">Integrations</th>
            </tr>
            <tr>
                <th style="vertical-align: middle;">Enrique</th>
                <th style="vertical-align: middle;">Jairo</th>
                <th style="vertical-align: middle;">Lizeth</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_one">Integrations 1</Button></td>
                <td><Button color="success" href="#/edq-stats/edq-graphics">Sports Graphics</Button></td>
                <td><Button color="danger" href="">Liz Graphics</Button></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_two">Integrations 2</Button></td>
                <td><Button color="success" href="">Videogames Graphics</Button></td>
                <td><Button color="danger" href="">Liz Graphics</Button></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_three">Integrations 3</Button></td>
                <td><Button color="success" href="">Alternative Graphics</Button></td>
                <td><Button color="danger" href="">Liz Graphics</Button></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_four">Integrations 4</Button></td>
                <td><Button color="success" href="">Alternative Graphics</Button></td>
                <td><Button color="danger" href="">Liz Graphics</Button></td>
            </tr>

        </tbody>
    </Table>


    <Button outline color = "secondary" on:click="{pop}">Volver</Button>

</main>