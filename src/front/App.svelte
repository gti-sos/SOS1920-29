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
	import EmpIntegrationsOne from './GUI_Enrique/Integrations_Enrique/EmpIntegrationsOne.svelte';
	import EmpIntegrationsTwo from './GUI_Enrique/Integrations_Enrique/EmpIntegrationsTwo.svelte';
	import EmpIntegrationsThree from './GUI_Enrique/Integrations_Enrique/EmpIntegrationsThree.svelte';
	import EmpIntegrationsFour from './GUI_Enrique/Integrations_Enrique/EmpIntegrationsFour.svelte';
	import EmpIntegrationsFive from './GUI_Enrique/Integrations_Enrique/EmpIntegrationsFive.svelte';
	import EmpIntegrationsSix from './GUI_Enrique/Integrations_Enrique/EmpIntegrationsSix.svelte';
	import EmpIntegrationsSeven from './GUI_Enrique/Integrations_Enrique/EmpIntegrationsSeven.svelte';
	import EmpIntegrationsEight from './GUI_Enrique/Integrations_Enrique/EmpIntegrationsEight.svelte';
	import EmpIntegrationsNine from './GUI_Enrique/Integrations_Enrique/EmpIntegrationsNine.svelte';
	import EmpIntegrationsTen from './GUI_Enrique/Integrations_Enrique/EmpIntegrationsTen.svelte';
	import EmpIntegrationsEleven from './GUI_Enrique/Integrations_Enrique/EmpIntegrationsEleven.svelte';
	import EmpIntegrationsTwelve from './GUI_Enrique/Integrations_Enrique/EmpIntegrationsTwelve.svelte';
	import EmpIntegrationsThirteen from './GUI_Enrique/Integrations_Enrique/EmpIntegrationsThirteen.svelte';
	import EmpIntegrationsFourteen from './GUI_Enrique/Integrations_Enrique/EmpIntegrationsFourteen.svelte';
	import EmpIntegrationsFifteen from './GUI_Enrique/Integrations_Enrique/EmpIntegrationsFifteen.svelte';
	

	//Jairo
	import EdqTable from './GUI_Jairo/EdqTable.svelte';
	import Edit_edq_stat from './GUI_Jairo/Edit_edq_stat.svelte';
	import EdqGraphics from './GUI_Jairo/EdqGraphics.svelte';
	import SportsGraphics from './GUI_Jairo/SportsGraphics.svelte';
	import VideogamesMoviesGraphics from './GUI_Jairo/VideogamesMoviesGraphics.svelte';
	import OtherGraphics from './GUI_Jairo/OtherGraphics.svelte';

	//Lizeth
	import WomanresearchersTable from './GUI_Lizeth/WomanresearchersTable.svelte';
	import Edit_womanresearchers_stat from './GUI_Lizeth/Edit_womanresearchers_stat.svelte';
	import WomanresearchersGraphOne from './GUI_Lizeth/WomanresearchersGraphOne.svelte';
	import WomanresearchersGraphTwo from './GUI_Lizeth/WomanresearchersGraphTwo.svelte';
	import IntegrationOne from './GUI_Lizeth/IntegrationOne.svelte';
	import IntegrationTwo from './GUI_Lizeth/IntegrationTwo.svelte';
	import IntegrationThree from './GUI_Lizeth/IntegrationThree.svelte';
	import IntegrationFour from './GUI_Lizeth/IntegrationFour.svelte';



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
		"/integrations/emp_four": EmpIntegrationsFour,
		"/integrations/emp_five": EmpIntegrationsFive,
		"/integrations/emp_six": EmpIntegrationsSix,
		"/integrations/emp_seven": EmpIntegrationsSeven,
		"/integrations/emp_eight": EmpIntegrationsEight,
		"/integrations/emp_nine": EmpIntegrationsNine,
		"/integrations/emp_ten": EmpIntegrationsTen,
		"/integrations/emp_eleven": EmpIntegrationsEleven,
		"/integrations/emp_twelve": EmpIntegrationsTwelve,
		"/integrations/emp_thirteen": EmpIntegrationsThirteen,
		"/integrations/emp_fourteen": EmpIntegrationsFourteen,
		"/integrations/emp_fifteen": EmpIntegrationsFifteen,

		//Routes Jairo
		"/edq-stats": EdqTable,
		"/edq-stats/:country/:year": Edit_edq_stat,
		"/edq-stats/edq-graphics": EdqGraphics,
		"/integrations/sports-graphics": SportsGraphics,
		"/integrations/videogames-movies-graphics": VideogamesMoviesGraphics,
		"/integrations/other-graphics": OtherGraphics,

		//Routes Lizeth
		"/womanresearchers-stats": WomanresearchersTable,
		"/womanresearchers-stats/:country/:year": Edit_womanresearchers_stat,
		"/womanresearchers-stats/womanresearchers-graph-one": WomanresearchersGraphOne,
		"/womanresearchers-stats/womanresearchers-graph-Two": WomanresearchersGraphTwo,
		"/integrations/integration-one": IntegrationOne,
		"/integrations/integration-two": IntegrationTwo,
		"/integrations/integration-three": IntegrationThree,
		"/integrations/integration-four": IntegrationFour,



		
		"*" : NotFound
	}
</script>


<main>
	<Router {routes}></Router>
</main>