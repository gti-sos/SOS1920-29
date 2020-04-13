const express = require("express");
const bodyParser = require("body-parser"); 
const path = require("path");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 80;
app.use("/", express.static("./public"));

const BASE_API_URL = "/api/v1";

// *****************API ENRIQUE***************************************************

var emp_stats = [];

app.get(BASE_API_URL+"/emp-stats/loadInitialData", (req,res) =>{
	
	var stat1 = new Object({ country: "Spain", 
	                         year: 2013, 
	                         emp_female_age15_24: 16.079, 
	                         emp_male_age15_24: 17.332, 	
	                         emp_vuln_female: 9.692, 
	                         emp_vuln_male: 15.328
	                       });
	
	var stat2 = new Object({ country: "Spain", 
	                         year: 2014, 
	                         emp_female_age15_24: 15.92, 
	                         emp_male_age15_24: 17.397, 	
	                         emp_vuln_female: 9.482, 
	                         emp_vuln_male: 15.062
	                       });
	
	var stat3 = new Object({ country: "Spain", 
	                         year: 2015, 
	                         emp_female_age15_24: 17.289, 
	                         emp_male_age15_24: 18.577, 	
	                         emp_vuln_female: 9.51, 
	                         emp_vuln_male: 14.616
	                       });
    
	var stat4 = new Object({ country: "Italy", 
	                         year: 2013, 
	                         emp_female_age15_24: 13.441, 
	                         emp_male_age15_24: 18.714, 
	                         emp_vuln_female: 14.141, 
	                         emp_vuln_male: 20.573
	                       });
	
	var stat5 = new Object({ country: "Italy", 
	                         year: 2014, 
	                         emp_female_age15_24: 12.547, 
	                         emp_male_age15_24: 18.196, 
	                         emp_vuln_female: 14.691, 
	                         emp_vuln_male: 20.492
	                       });
	
	var stat6 = new Object({ country: "Italy", 
	                         year: 2015, 
	                         emp_female_age15_24: 12.276, 
	                         emp_male_age15_24: 18.638, 
	                         emp_vuln_female: 14.221, 
	                         emp_vuln_male: 20.267
	                       });
	
	var stat7 = new Object({ country: "Czechia", 
	                         year: 2013, 
	                         emp_female_age15_24: 20.835, 
	                         emp_male_age15_24: 29.927, 
                             emp_vuln_female: 11.624, 
                             emp_vuln_male: 16.705
	                       });
	
	var stat8 = new Object({ country: "Czechia", 
	                         year: 2014, 
	                         emp_female_age15_24: 21.561, 
	                         emp_male_age15_24: 32.336, 
                             emp_vuln_female: 11.191, 
                             emp_vuln_male: 17.095
	                       });
	
	var stat9 = new Object({ country: "Czechia", 
	                         year: 2015, 
	                         emp_female_age15_24: 23.59, 
	                         emp_male_age15_24: 33.133, 
                             emp_vuln_female: 10.918, 
                             emp_vuln_male: 16.066
	                       });
	
	var stat10 = new Object({ country: "Finland", 
	                         year: 2013, 
	                         emp_female_age15_24: 44.203, 
                        	 emp_male_age15_24: 39.12, 	
                             emp_vuln_female: 6.966, 
                         	 emp_vuln_male: 11.736
	                       });
	
	var stat11 = new Object({ country: "Finland", 
	                         year: 2014, 
	                         emp_female_age15_24: 23.438, 
                        	 emp_male_age15_24: 39.773, 	
                             emp_vuln_female: 7.368, 
                         	 emp_vuln_male: 12.043
	                       });
	
	var stat12 = new Object({ country: "Finland", 
	                         year: 2015, 
	                         emp_female_age15_24: 43.136, 
                        	 emp_male_age15_24: 38.142, 	
                             emp_vuln_female: 7.311, 
                         	 emp_vuln_male: 12.512
	                       });
	
	var stat13 = new Object({ country: "Portugal", 
	                         year: 2013, 
	                         emp_female_age15_24: 20.172, 
                        	 emp_male_age15_24: 22.909, 	
                             emp_vuln_female: 14.151, 
                         	 emp_vuln_male: 19.106
	                       });
	
	var stat14 = new Object({ country: "Portugal", 
	                         year: 2014, 
	                         emp_female_age15_24: 21.682, 
                        	 emp_male_age15_24: 22.873, 	
                             emp_vuln_female: 11.754, 
                         	 emp_vuln_male: 17.166
	                       });
	
	var stat15 = new Object({ country: "Portugal", 
	                         year: 2015, 
	                         emp_female_age15_24: 21.592, 
                        	 emp_male_age15_24: 24.092, 	
                             emp_vuln_female: 11.068, 
                         	 emp_vuln_male: 16.037
	                       });
	
	var stat16 = new Object({ country: "Lithuania", 
	                         year: 2013, 
	                         emp_female_age15_24: 21.347, 
                        	 emp_male_age15_24: 27.553, 	
                             emp_vuln_female: 8.442, 
                         	 emp_vuln_male: 10.741
	                       });
	
	var stat17 = new Object({ country: "Lithuania", 
	                         year: 2014, 
	                         emp_female_age15_24: 23.863, 
                        	 emp_male_age15_24: 31.013, 	
                             emp_vuln_female: 8.934, 
                         	 emp_vuln_male: 10.733
	                       });
	
	var stat18 = new Object({ country: "Lithuania", 
	                         year: 2015, 
	                         emp_female_age15_24: 25.676, 
                        	 emp_male_age15_24: 30.841, 	
                             emp_vuln_female: 8.695, 
                         	 emp_vuln_male: 11.325
	                       });
	
	var stat19 = new Object({ country: "Croatia", 
	                         year: 2013, 
	                         emp_female_age15_24: 12.438, 
                        	 emp_male_age15_24: 17.375, 	
                             emp_vuln_female: 13.013, 
                         	 emp_vuln_male: 14.273
	                       });
	
	var stat20 = new Object({ country: "Croatia", 
	                         year: 2014, 
	                         emp_female_age15_24: 13.305, 
                        	 emp_male_age15_24: 21.213, 	
                             emp_vuln_female: 9.252, 
                         	 emp_vuln_male: 11.36
	                       });
	
	var stat21 = new Object({ country: "Croatia", 
	                         year: 2015, 
	                         emp_female_age15_24: 15.64, 
                        	 emp_male_age15_24: 22.376, 	
                             emp_vuln_female: 9.092, 
                         	 emp_vuln_male: 11.65
	                       });
	
	var stat22 = new Object({ country: "Malta", 
	                         year: 2013, 
	                         emp_female_age15_24: 43.986, 
                        	 emp_male_age15_24: 48.23, 	
                             emp_vuln_female: 4.796, 
                         	 emp_vuln_male: 12.186
	                       });
	
	var stat23 = new Object({ country: "Malta", 
	                         year: 2014, 
	                         emp_female_age15_24: 46.572, 
                        	 emp_male_age15_24: 46.136, 	
                             emp_vuln_female: 5.292, 
                         	 emp_vuln_male: 11.995
	                       });
	
	var stat24 = new Object({ country: "Malta", 
	                         year: 2015, 
	                         emp_female_age15_24: 45.336, 
                        	 emp_male_age15_24: 46.61, 	
                             emp_vuln_female: 5.151, 
                         	 emp_vuln_male: 12.199
	                       });
	
	emp_stats.push(stat1, stat2, stat3, stat4, stat5, stat6, stat7, stat8, stat9, stat10, 
	               stat11, stat12, stat13, stat14, stat15, stat16, stat17, stat18, stat19, 
	               stat20, stat21, stat22, stat23, stat24);
	
	
	res.sendStatus(201,"LOADED RESOURCES!");
	
});

//GET EMP_STATS (OBTENGO TODOS LOS RECURSOS)

app.get(BASE_API_URL+"/emp-stats", (req,res) =>{
	
	res.send(JSON.stringify(emp_stats,null,2));

	
});


//GET EMP_STATS/COUNTRY/YEAR (OBTENGO UN RECURSO ESPECÍFICO)

app.get(BASE_API_URL+"/emp-stats/:country/:year", (req,res) =>{
	
	var country = req.params.country;
	var year = req.params.year;
	
	var filteredEmp = emp_stats.filter((e) =>{
		return (e.country == country && e.year == year);
	});
	
	
	if(filteredEmp.length == 1){
		res.send(filteredEmp[0]);
		
	}else{
		res.sendStatus(404, "COUNTRY OR YEAR NOT FOUND");
	}
});

//GET EMP_STATS/XXX (OBTENGO UN RECURSO ESPECÍFICO (PAÍSES O AÑOS) SEGÚN EL PARÁMETRO DE LA RUTA)

app.get(BASE_API_URL+"/emp-stats/:resource", (req,res) =>{
	
	var resource = req.params.resource; 
	
	var filteredResource = emp_stats.filter((e) => {
		//return (e.country == resource) || (e.year == resource);
		if(e.country == resource){
			return e;
		
		}else if(e.year == resource){
			return e;
		}
	
	});
	
	if(filteredResource.length >= 1) {
		res.send(filteredResource);	
	
	}else{
		res.sendStatus(404, "RESOURCE NOT FOUND");
	}
	
});
	
//POST EMP_STATS (CREO UN NUEVO RECURSO)

app.post(BASE_API_URL+"/emp-stats", (req,res) => {
	
	var newEmp = req.body;
	var cont_repeated = false;
	
	emp_stats.forEach((r) =>{
		if(newEmp.country == r.country && newEmp.year == r.year){
			cont_repeated = true;
		}
	})

	if(cont_repeated){
		res.sendStatus(409,"The resource already exists!!");
	
	}else{
		
		if(newEmp == "" || (newEmp.country == null) || (newEmp.year == null)){
			res.sendStatus(400,"BAD REQUEST");
		
		}else{
			emp_stats.push(newEmp); 
			res.sendStatus(201,"CREATED");
		}
	}
	
});

//PUT EMP_STATS/XXX (ACTUALIZA UN RECURSO CONCRETO)

app.put(BASE_API_URL+"/emp-stats/:country/:year", (req,res) =>{
	
	var country = req.params.country;
	var year = req.params.year;
	var updateEmp = req.body;
	var validator_bool = false;
	var found = false;
	
	var updateEmployments = emp_stats.map((e) =>{
		if(e.country == country && e.year == year){
			found = true;
			
			if(updateEmp.country != country || updateEmp.year != year){
				return validator_bool;
			
			}else{
				validator_bool = true;
				return updateEmp;
			}
			
		}else{
			return e;
		}
	});
	
	if(found == false){
		res.sendStatus(404,"Resource does not exist");
	
	}else if(validator_bool == false){
		res.sendStatus(409, "Country or year cannot be modified!!");
	
	}else if(validator_bool == true){
		emp_stats = updateEmployments;
		res.sendStatus(200,"Updated resource");	 
	}
	
});

//DELETE EMP_STATS (BORRAR TODOS LOS RECURSOS)
=======
>>>>>>> D01

//API Jairo
const edq_stats_API = require(path.join(__dirname,"edq_stats_API"));
edq_stats_API(app);

//API Enrique
const emp_stats_API = require(path.join(__dirname,"emp_stats_API"));
emp_stats_API(app);

//API Liz

const BASE_API_URL = "/api/v1";


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