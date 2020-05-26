<script>

    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";

    async function loadGraph() {

        let MyData = [];
        let MyDataEmp = [];
        let year_string;
        let year_int;

        const resData = await fetch("/api/v2/emp-stats");
        MyData = await resData.json();
        
        MyData.forEach( (e) => {
            
            if(e.country == 'Spain'){
                year_int = e.year;
                year_string = year_int.toString();
                MyDataEmp.push({year: year_string, value: e.emp_vuln_male, value2: e.emp_vuln_female, value3: e.emp_male_age15_24, value4: e.emp_female_age15_24})
            }
            
                       
        });
        console.log(JSON.stringify(MyDataEmp, null, 2));
        
        new Morris.Line({
        // ID of the element in which to draw the chart.
        element: 'myfirstchart',
        // Chart data records -- each entry in this array corresponds to a point on
        // the chart.
        data: MyDataEmp,
        // The name of the data record attribute that contains x-values.
        xkey: 'year',
        // A list of names of data record attributes that contain y-values.
        ykeys: ['value', 'value2', 'value3', 'value4'],
        lineWidth: 3,
        // Labels for the ykeys -- will be displayed when you hover over the
        // chart.
        labels: ['Porcentaje empleo vulnerable masculino', 'Porcentaje empleo vulnerable femenino', 'Porcentaje empleo femenino juvenil (15 a 24 años)', 'Porcentaje empleo masculino juvenil (15 a 24 años)'],
        xLabels: "year",
        yLabels: "porcentage",
        hideHover: true,
        resize: true,
        lineColors: ['#FF0000', '#0000FF', '#DAA520', '#32CD32']
        });
    }
    

</script>

<svelte:head> 
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <h1 style="text-align:center">Gráfica 2 </h1>
    <h4 style="text-align:center">Porcentaje de empleo (%) en España. Año 2013, 2014 y 2015</h4>
    
    <div id="myfirstchart" style="height: 250px;"></div>

    <p style="text-align:center">Esta gráfica nos muestra el porcentaje de empleo vulnerable masculino (línea roja), empleo vulnerable femenino (línea azul), empleo femenino juvenil (línea marron), empleo masculino juvenil (línea verde) de España en los años de crisis 2013, 2014 y 2015</p>

    <Button outline color="secondary" on:click="{pop}">Volver</Button>

</main>
