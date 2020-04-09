const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const emp_stats_API = require(path.join(__dirname,"emp_stats_API"));
//const edq_stats_API = require(path.join(__dirname,"edq_stats_API"));

const port = process.env.PORT || 80;

const app = express();
app.use(bodyParser.json());

const BASE_API_URL = "/api/v1";

emp_stats_API(app);
//edq_stats_API(app);

app.use("/", express.static("./public"));


/***************************** Feedback 3 Jairo*************************************************/

var edq_stats;

//LoadInitialData
app.get(BASE_API_URL+"/edq-stats/loadInitialData", (request, response) =>{
	edq_stats = [
		{
			country: "Spain",
			year: 2013,
			edq_sg: 19.4,
			edq_gee: 42.9,
			edq_ptr: 14.8
		},
		{
			country: "Spain",
			year: 2014,
			edq_sg: 21.1,
			edq_gee: 43,
			edq_ptr: 15.1
		},
		{
			country: "Spain",
			year: 2015,
			edq_sg: 22.4,
			edq_gee: 44.7,
			edq_ptr: 14.9
		},
		{
			country: "Italy",
			year: 2013,
			edq_sg: 13.8,
			edq_gee: 66.8,
			edq_ptr: 13.5
		},
		{
			country: "Italy",
			year: 2014,
			edq_sg: 13.9,
			edq_gee: 66.8,
			edq_ptr: 13.5
		},
		{
			country: "Italy",
			year: 2015,
			edq_sg: 13.5,
			edq_gee: 67.4,
			edq_ptr: 13.2
		},
		{
			country: "Czechia",
			year: 2013,
			edq_sg: 16.9,
			edq_gee: 6.2,
			edq_ptr: 13.9
		},
		{
			country: "Czechia",
			year: 2014,
			edq_sg: 16.6,
			edq_gee: 6,
			edq_ptr: 13.7
		},
		{
			country: "Czechia",
			year: 2015,
			edq_sg: 17.2,
			edq_gee: 6.4,
			edq_ptr: 13.5
		},
		{
			country: "Finland",
			year: 2013,
			edq_sg: 22,
			edq_gee: 13.9,
			edq_ptr: 10.3
		},
		{
			country: "Finland",
			year: 2014,
			edq_sg: 22.3,
			edq_gee: 14,
			edq_ptr: 10.2
		},
		{
			country: "Finland",
			year: 2015,
			edq_sg: 23.7,
			edq_gee: 14.2,
			edq_ptr: 10.2
		},
		{
			country: "Portugal",
			year: 2013,
			edq_sg: 18.6,
			edq_gee: 8.8,
			edq_ptr: 16.6
		},
		{
			country: "Portugal",
			year: 2014,
			edq_sg: 17.8,
			edq_gee: 8.7,
			edq_ptr: 17.3
		},
		{
			country: "Portugal",
			year: 2015,
			edq_sg: 18.6,
			edq_gee: 8.6,
			edq_ptr: 17.4
		},
		{
			country: "Lithuania",
			year: 2013,
			edq_sg: 22.5,
			edq_gee: 1.6,
			edq_ptr: 10
		},
		{
			country: "Lithuania",
			year: 2014,
			edq_sg: 19.3,
			edq_gee: 1.6,
			edq_ptr: 10
		},
		{
			country: "Lithuania",
			year: 2015,
			edq_sg: 18.5,
			edq_gee: 1.5,
			edq_ptr: 10.6
		},
		{
			country: "Croatia",
			year: 2013,
			edq_sg: 15.5,
			edq_gee: 1.9,
			edq_ptr: 12.2
		},
		{
			country: "Croatia",
			year: 2014,
			edq_sg: 15.7,
			edq_gee: 1.9,
			edq_ptr: 12
		},
		{
			country: "Croatia",
			year: 2015,
			edq_sg: 16.8,
			edq_gee: 1.9,
			edq_ptr: 12
		},
		{
			country: "Malta",
			year: 2013,
			edq_sg: 15.8,
			edq_gee: 0.4,
			edq_ptr: 13.4
		},
		{
			country: "Malta",
			year: 2014,
			edq_sg: 15.7,
			edq_gee: 0.4,
			edq_ptr: 13.6
		},
		{
			country: "Malta",
			year: 2015,
			edq_sg: 15.3,
			edq_gee: 0.5,
			edq_ptr: 12.9
		},
	];
	//response.send(JSON.stringify(edq_stats,null,2));
	response.sendStatus(200, "CREATED DATA");
});

//DELETE TODOS LOS DATOS
app.delete(BASE_API_URL+"/edq-stats",(request,response) =>{
	
	var filtered_data = edq_stats.filter((data) => {
		return (0);
	});
	
	edq_stats = filtered_data;
	
	response.sendStatus(200, "DONE");
});

//GET DATOS
app.get(BASE_API_URL+"/edq-stats",(request,response) =>{
	response.send(JSON.stringify(edq_stats,null,2));
});

//POST DATO
app.post(BASE_API_URL+"/edq-stats",(request,response) =>{
	
	var newData = request.body;
	
	if(newData.country == null || newData.year == null || newData.edq_sg == null || newData.edq_gee == null || newData.edq_ptr == null){
		response.sendStatus(400,"BAD REQUEST, EMPTY FIELDS.");
	}
	else{
		//Compruebo si el dato recibido ya existe
		var filtered_data = edq_stats.filter((data) => {
			return ( (data.country == newData.country && data.year == newData.year));
		});
		
		if(filtered_data.length > 0){
		   response.sendStatus(409, "GIVEN DATA ALREADY EXISTS");
		}
		else{
			edq_stats.push(newData);
			response.sendStatus(201,"CREATED");
		}
	}
	
	
});

//DELETE DATOS
app.delete(BASE_API_URL+"/edq-stats/:param", (request,response) =>{
	
	var param = request.params.param;
	
	//Devuelvo los datos que no coincidan con el valor recibido ni en "country" ni en "year".
	var filtered_data = edq_stats.filter((data) => {
		return ( (data.country != param) && (data.year != param));
	});
	
	if(filtered_data.length < edq_stats.length){
		edq_stats = filtered_data;
		response.sendStatus(200, "DONE");
	}
	else{
		response.sendStatus(404, "DATA NOT FOUND");
	}
	
});

//PUT DATOS ยกNO PERMITIDO!
app.put(BASE_API_URL+"/edq-stats",(request,response) =>{
	response.sendStatus(405, "METHOD NOT ALLOWED ON A COLLECTION.")
});

//GET DATO ESPECIFICO
app.get(BASE_API_URL+"/edq-stats/:param1/:param2",(request,response) =>{
	
	var param1 = request.params.param1;
	var param2 = request.params.param2;
	
	var filtered_data = edq_stats.filter((data) => {
		return ( (data.country == param1 && data.year == param2) || (data.country == param2 && data.year == param1));
	});
	
	if(filtered_data.length >= 1){
		response.send(filtered_data[0]);
	}
	else{
		response.sendStatus(404, "DATA NOT FOUND");
	}
	
});

//POST DATO ESPECIFICO ยกNO PERMITIDO!
app.post(BASE_API_URL+"/edq-stats/:param1/:param2",(request,response) =>{
	response.sendStatus(405, "METHOD NOT ALLOWED ON A SINGLE DATA.");
});

//DELETE DATO ESPECIFICO
app.delete(BASE_API_URL+"/edq-stats/:param1/:param2", (request,response) =>{
	
	var param1 = request.params.param1;
	var param2 = request.params.param2;
	
	
	var filtered_data = edq_stats.filter((data) => {
		return ( (data.country != param1 || data.year != param2) && (data.country != param2 || data.year != param1) );
	});
	
	
	if(filtered_data.length < edq_stats.length){
		edq_stats = filtered_data;
		response.sendStatus(200, "DONE");
	}
	else{
		response.sendStatus(404, "DATA NOT FOUND");
	}
	
});

//PUT DATO ESPECIFICO
app.put(BASE_API_URL+"/edq-stats/:param1/:param2", (request,response) =>{
	var param1 = request.params.param1;
	var param2 = request.params.param2;
	
	var filtered_data = edq_stats.filter((data) => {
		return ( (data.country == param1 && data.year == param2) || (data.country == param2 && data.year == param1));
	});
	
	if(filtered_data.length >= 1){
		var newData = request.body;
		
		//Comprobamos si los datos de referencia en el body coinciden con los del servidor.
		if( (newData.country == param1 && newData.year == param2) || (newData.country == param2 && newData.year == param1) ){
			filtered_data[0].country = newData.country;
			filtered_data[0].year = newData.year;
			filtered_data[0].edq_sg = newData.edq_sg;
			filtered_data[0].edq_gee = newData.edq_gee;
			filtered_data[0].edq_ptr = newData.edq_ptr;

			response.sendStatus(200, "DONE");
		}
		else{
			response.sendStatus(409, "ERROR IN BODY DATA");
		}
		
	}
	else{
		response.sendStatus(404, "DATA NOT FOUND");
	}
	
});


/**************************** Fin Feedback 3 Jairo**********************************/


/**************************** Inicio Parte Lizeth **********************************/
var womanresearchers_stats;


//const BASE_API_URL = "/api/v1";

//load initial data
app.get(BASE_API_URL+"/womanresearchers-stats/loadInitialData", (req, res) =>{
	womanresearchers_stats = [
	{ 
		country: "Croatia",
		year: 2013,
		womanresearchers_he: 3405,
		womanresearchers_gov: 1439,
		womanresearchers_bent:489
	},
	{ 
		country: "Croatia",
		year: 2014,
		womanresearchers_he: 3397,
		womanresearchers_he: 1352,
		womanresearchers_bent:497
	},
	{ 
		country: "Croatia",
		year: 2015,
		womanresearchers_he: 3582,
		womanresearchers_gov: 1297,
		womanresearchers_bent:545
	},
	{ 
		country: "Czechia",
		year: 2013,
		womanresearchers_he: 8166,
		womanresearchers_gov: 3633,
		womanresearchers_bent:2662
	},
	{ 
		country: "Czechia",
		year: 2014,
		womanresearchers_he: 8115,
		womanresearchers_gov: 3625,
		womanresearchers_bent:2975
	},
	{ 
		country: "Czechia",
		year: 2015,
		womanresearchers_he: 8427,
		womanresearchers_gov: 3847,
		womanresearchers_bent:2887
	},
	{ 
		country: "Finland",
		year: 2013,
		womanresearchers_he: 10488,
		womanresearchers_gov: 2543,
		womanresearchers_bent:4465
	},
	{ 
		country: "Finland",
		year: 2014,
		womanresearchers_he: 10601,
		womanresearchers_gov: 2274,
		womanresearchers_bent:4540
	},
	{ 
		country: "Finland",
		year: 2015,
		womanresearchers_he: 10583,
		womanresearchers_gov: 2160,
		womanresearchers_bent:4849
	},
	{ 
		country: "Italy",
		year: 2013,
		womanresearchers_he: 31325,
		womanresearchers_gov: 12843,
		womanresearchers_bent:11315
	},
	{ 
		country: "Italy",
		year: 2014,
		womanresearchers_he: 31949,
		womanresearchers_gov: 13276,
		womanresearchers_bent:12106
	},	
	{ 
		country: "Italy",
		year: 2015,
		womanresearchers_he: 31198,
		womanresearchers_gov: 13838,
		womanresearchers_bent:14337
	},
	{ 
		country: "Lithuania",
		year: 2013,
		womanresearchers_he: 7632,
		womanresearchers_gov: 871,
		womanresearchers_bent:760
	},
	{ 
		country: "Lithuania",
		year: 2014,
		womanresearchers_he: 7494,
		womanresearchers_gov: 928,
		womanresearchers_bent:1312
	},
	{ 
		country: "Lithuania",
		year: 2015,
		womanresearchers_he: 6991,
		womanresearchers_gov: 963,
		womanresearchers_bent:821
	},
	{ 
		country: "Malta",
		year: 2013,
		womanresearchers_he: 266,
		womanresearchers_gov: 8,
		womanresearchers_bent:146
	},
	{ 
		country: "Malta",
		year: 2014,
		womanresearchers_he: 292,
		womanresearchers_gov: 9,
		womanresearchers_bent:109
	},
	{ 
		country: "Malta",
		year: 2015,
		womanresearchers_he: 286,
		womanresearchers_gov: 9,
		womanresearchers_bent:108
	},
	{ 
		country: "Portugal",
		year: 2013,
		womanresearchers_he: 25568,
		womanresearchers_gov: 6597,
		womanresearchers_bent:7223
	},
	{ 
		country: "Portugal",
		year: 2014,
		womanresearchers_he: 24958,
		womanresearchers_gov: 6718,
		womanresearchers_bent:9628
	},
	{ 
		country: "Portugal",
		year: 2015,
		womanresearchers_he: 25428,
		womanresearchers_gov: 6469,
		womanresearchers_bent:7319
	},
	{ 
		country: "Spain",
		year: 2013,
		womanresearchers_he: 48723,
		womanresearchers_gov: 15115,
		womanresearchers_bent:18060
	},
	{ 
		country: "Spain",
		year: 2014,
		womanresearchers_he: 49708,
		womanresearchers_gov: 15094,
		womanresearchers_bent:18141
	},
	{ 
		country: "Spain",
		year: 2015,
		womanresearchers_he: 50782,
		womanresearchers_gov: 16257,
		womanresearchers_bent:18469
	}
];
	//res.send(JSON.stringify(womanresearchers_stats,null,2));
	res.sendStatus(200,"OK");
});


// GET womanresearchers
app.get(BASE_API_URL+"/womanresearchers-stats", (req,res) =>{
	res.send(JSON.stringify(womanresearchers_stats,null,2));
	console.log("Data sent:"+JSON.stringify(womanresearchers_stats,null,2));
});

// POST womanresearchers
app.post(BASE_API_URL+"/womanresearchers-stats", (req,res) =>{
	var newWoman = req.body;
	
	var filteredwomanresearchers = womanresearchers_stats.filter((c) => {
			return ( (c.country == newWoman.country && c.year == newWoman.year));
		});
	
	if(newWoman == "" || newWoman.country == null || newWoman.year == null ){
		res.sendStatus(400,"BAD REQUEST");
	} 
	else if(filteredwomanresearchers.length > 0){
			res.sendStatus(409, "CONFLICT");
	}
	else{
			womanresearchers_stats.push(newWoman);
			res.sendStatus(201,"CREATED");
		
	}
});


// DELETE womanresearchers
app.delete(BASE_API_URL+"/womanresearchers-stats",(req,res)=>{
	var filteredwomanresearchers = womanresearchers_stats.filter((c) => {
		return (0);
	});
		womanresearchers_stats = filteredwomanresearchers;
		res.sendStatus(200,"OK");
	
});

// PUT womanresearchers NO SE PERMITE
app.put(BASE_API_URL+"/womanresearchers-stats",(req,res) =>{
	res.sendStatus(405, "METHOD NOT ALLOWED")
});


// GET womanresearchers/XXX
app.get(BASE_API_URL+"/womanresearchers-stats/:country/:year", (req,res)=>{
	var country = req.params.country;
	var year = req.params.year;
	
	var filteredwomanresearchers = womanresearchers_stats.filter((c) => {
		return (c.country == country && c.year == year );
	});
	if(filteredwomanresearchers.length >= 1){
		res.send(filteredwomanresearchers[0]);
		
	}else{
		res.sendStatus(404,"NOT FOUND");
	}
});

//POST womanresearchers/XXX NO SE PERMITE

app.post(BASE_API_URL+"/womanresearchers-stats/:country/:year",(req,res) =>{
	res.sendStatus(405, "METHOD NOT ALLOWED")
});


// PUT womanresearchers/XXX
app.put(BASE_API_URL+"/womanresearchers-stats/:country/:year", (req,res)=>{
	var country = req.params.country;
	var year = req.params.year;
	
	var newWomanResearchers= req.body;
	
	var filteredwomanresearchers = womanresearchers_stats.filter((c) => {
		return (c.country == country && c.year== year);
	});
	if(newWomanResearchers.country != country && newWomanResearchers.year != year){
		
		res.sendStatus(409,"CONFLICT");
		
	}else{
		filteredwomanresearchers[0].country= newWomanResearchers.country;
		filteredwomanresearchers[0].year= newWomanResearchers.year;
		filteredwomanresearchers[0].womanresearchers_he= newWomanResearchers.womanresearchers_he;
		filteredwomanresearchers[0].womanresearchers_gov= newWomanResearchers.womanresearchers_gov;
		filteredwomanresearchers[0].womanresearchers_bent= newWomanResearchers.womanresearchers_bent;
		
		res.sendStatus(200,"OK");
		
	}
});

// DELETE womanresearchers/XXX
app.delete(BASE_API_URL+"/womanresearchers-stats/:country/:year", (req,res)=>{
	var country = req.params.country;
	var year = req.params.year;


	var filteredwomanresearchers = womanresearchers_stats.filter((c) => {
		return (c.country != country || c.year !=year);
	});
	if(filteredwomanresearchers.length < womanresearchers_stats.length){
		womanresearchers_stats = filteredwomanresearchers;
		
		res.sendStatus(200,"OK");
	}else{
		res.sendStatus(404,"NOT FOUND");
	}
});

/**************************** Fin Parte Lizeth**********************************/


app.listen(port, () => {
	console.log("Server ready!");
});

console.log("Starting server...");