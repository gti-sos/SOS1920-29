<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	import NotFound from './NotFound.svelte';
	import Integrations from './Integrations.svelte';
	import Analytics from './Analytics.svelte';
	
	//Enrique
    import EmpTable from './GUI_Enrique/EmpTable.svelte';
	import EditEmp from './GUI_Enrique/EditEmp.svelte';
	import EmpGraph from './GUI_Enrique/EmpGraph.svelte';
	import EmpGraphTwo from './GUI_Enrique/EmpGraphTwo.svelte';
	import EmpIntegrationsOne from './GUI_Enrique/EmpIntegrationsOne.svelte';
	import EmpIntegrationsTwo from './GUI_Enrique/EmpIntegrationsTwo.svelte';
	import EmpIntegrationsThree from './GUI_Enrique/EmpIntegrationsThree.svelte';

	//Jairo
	import EdqTable from './GUI_Jairo/EdqTable.svelte';
	import Edit_edq_stat from './GUI_Jairo/Edit_edq_stat.svelte';
	import EdqGraphics from './GUI_Jairo/EdqGraphics.svelte';
	import SportsGraphics from './GUI_Jairo/SportsGraphics.svelte';
	import VideogamesMoviesGraphics from './GUI_Jairo/VideogamesMoviesGraphics.svelte';

	//Lizeth
	import WomanresearchersTable from './GUI_Lizeth/WomanresearchersTable.svelte';
	import Edit_womanresearchers_stat from './GUI_Lizeth/Edit_womanresearchers_stat.svelte';
	import WomanresearchersGraphOne from './GUI_Lizeth/WomanresearchersGraphOne.svelte';
	import WomanresearchersGraphTwo from './GUI_Lizeth/WomanresearchersGraphTwo.svelte';
	import IntegrationOne from './GUI_Lizeth/IntegrationOne.svelte';



	const routes = {
		"/" : Home,
		"/analytics": Analytics,
		"/integrations": Integrations,

		//Routes Enrique
        "/emp-stats" : EmpTable,
		"/emp-stats/:country/:year" : EditEmp,
		"/emp-stats/graph" : EmpGraph,
		"/emp-stats/graph-two" : EmpGraphTwo,
		"/integrations/emp_one": EmpIntegrationsOne,
		"/integrations/emp_two": EmpIntegrationsTwo,
		"/integrations/emp_three": EmpIntegrationsThree,

		//Routes Jairo
		"/edq-stats": EdqTable,
		"/edq-stats/:country/:year": Edit_edq_stat,
		"/edq-stats/edq-graphics": EdqGraphics,
		"/integrations/sports-graphics": SportsGraphics,
		"/integrations/videogames-movies-graphics": VideogamesMoviesGraphics,

		//Routes Lizeth
		"/womanresearchers-stats": WomanresearchersTable,
		"/womanresearchers-stats/:country/:year": Edit_womanresearchers_stat,
		"/womanresearchers-stats/womanresearchers-graph-one": WomanresearchersGraphOne,
		"/womanresearchers-stats/womanresearchers-graph-Two": WomanresearchersGraphTwo,
		"/integrations/integration-one": IntegrationOne,


		
		"*" : NotFound
	}
</script>


<main>
	<Router {routes}></Router>
</main>