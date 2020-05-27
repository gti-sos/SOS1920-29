<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";
    import {create_xData,loadDataset_sg, loadDataset_gee, loadDataset_ptr} from "./GUI_Jairo/loadDatasets_edq.js";

    //create_xData();

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/data.js"></script>
</svelte:head>


<main>
    <h3>Gráfica comparativa conjunta.</h3>


    <Button outline color = "secondary" on:click="{pop}">Volver</Button>

</main>