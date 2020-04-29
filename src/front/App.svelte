<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
    import NotFound from './NotFound.svelte';
    import EmpTable from './GUI_Enrique/EmpTable.svelte';
    import EditEmp from './GUI_Enrique/EditEmp.svelte';

	const routes = {
        "/" : Home,
        "/emp-stats" : EmpTable,
		"/emp-stats/:country/:year" : EditEmp,
		"*" : NotFound
	}
</script>

<main>
	<h1>Applications</h1>
	<Router {routes}></Router>
</main>