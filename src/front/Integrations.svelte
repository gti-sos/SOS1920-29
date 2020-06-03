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
                <td><Button outline color="warning" href="#/integrations/emp_one">Integration 1</Button></td>
                <td><Button color="success" href="#/integrations/sports-graphics">Sports Graphics</Button></td>
                <td><Button color="danger" href="#/integrations/integration-one">Art Graphics</Button></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_two">Integration 2</Button></td>
                <td><Button color="success" href="#/integrations/videogames-movies-graphics">Videogames and movies Graphics</Button></td>
                <td><Button color="danger" href="#/integrations/integration-two"> Media Graphics</Button></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_three">Integration 3</Button></td>
                <td><Button color="success" href="#/integrations/other-graphics">Other Graphics</Button></td>
                <td><Button color="danger" href="#/integrations/integration-three">Environment Graphics</Button></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_four">Integration 4</Button></td>
                <td></td>
                <td><Button color="danger" href="#/integrations/integration-four">Science Graphics</Button></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_five">Integration 5</Button></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_six">Integration 6</Button></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_seven">Integration 7</Button></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_eight">Integration 8</Button></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_nine">Integration 9</Button></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_ten">Integration 10</Button></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_eleven">Integration 11</Button></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_twelve">Integration 12</Button></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_thirteen">Integration 13</Button></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_fourteen">Integration 14</Button></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><Button outline color="warning" href="#/integrations/emp_fifteen">Integration 15</Button></td>
                <td></td>
                <td></td>
            </tr>

        </tbody>
    </Table>


    <Button outline color = "secondary" on:click="{pop}">Volver</Button>

</main>