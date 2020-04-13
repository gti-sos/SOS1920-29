module.exports = function(app){
	
	console.log("Entrando en API edq_stats...");
	
	const dataStore = require("nedb");
	const path = require("path");
	const dbFileName = path.join(__dirname,"edq_stats.db");
	
	const db = new dataStore({
		filename: dbFileName,
		autoload: true}
	);
	
	const BASE_API_URL = "/api/v1";

	var edq_stats = [
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

	//LoadInitialData ACTUALIZADO
	app.get(BASE_API_URL+"/edq-stats/loadInitialData", (request, response) =>{
		//response.send(JSON.stringify(edq_stats,null,2));
		db.insert(edq_stats);
		response.sendStatus(200, "CREATED DATA");
	});

	//DELETE TODOS LOS DATOS ACTUALIZADO
	app.delete(BASE_API_URL+"/edq-stats",(request,response) =>{
		
		console.log("New DELETE .../edq-stats");
		
		db.remove({}, {multi:true}, function (err, numRemoved) {
			console.log("Removed "+numRemoved+" elements.")
		});
		response.sendStatus(200, "DELETED DATA");
		
	});

	//GET DATOS ACTUALIZADO
	app.get(BASE_API_URL+"/edq-stats",(request,response) =>{

		console.log("New GET .../edq-stats");
		
		if(request.query){
			/*
			console.log(request.query);
			console.log(Object.keys(request.query));
			console.log(Object.values(request.query));
			console.log(Object.keys(request.query).length);
			*/
			
			//Voy a comprobar que las querys que llegan son campos válidos, en caso de que alguno no lo sea devuelvo error 400.
			
			let error_400 = false;
			
			for(query in request.query){
				if( (query != "country") && (query != "year") && (query != "edq_sg") && (query != "edq_gee") && (query != "edq_ptr")){
					error_400 = true;
				}
			}
			if(error_400){
				response.sendStatus(400, "ERROR IN DATA FIELDS.");
			}
			else{
				db.find({}, (err, data) =>{
				
					if(data.length > 0){
						
						data.forEach( (d) => {
						delete d._id;
						});

						if(request.query.country){
							data = data.filter((objeto) => (objeto.country == request.query.country));
						}
						if(request.query.year){
							data = data.filter((objeto) => (objeto.year == request.query.year));
						}
						if(request.query.edq_sg){
							data = data.filter((objeto) => (objeto.edq_sg == request.query.edq_sg));
						}
						if(request.query.edq_gee){
							data = data.filter((objeto) => (objeto.edq_gee == request.query.edq_gee));
						}
						if(request.query.edq_ptr){
							data = data.filter((objeto) => (objeto.edq_ptr == request.query.edq_ptr));
						}

						response.send(JSON.stringify(data,null,2));
					}
					else{
						response.sendStatus(404, "DATA NOT FOUND.");
					}
				
				});
			}

		}
		else{
			
			db.find({}, (err, data) =>{

				data.forEach( (d) => {
					delete d._id;
				});

				response.send(JSON.stringify(data,null,2));
				//console.log("Data sent: "+JSON.stringify(data,null,2));
			});
		}
			

	});

	//POST DATO ACTUALIZADO
	app.post(BASE_API_URL+"/edq-stats",(request,response) =>{

		var newData = request.body;

		if(newData.country == null || newData.year == null || newData.edq_sg == null || newData.edq_gee == null || newData.edq_ptr == null){
			response.sendStatus(400,"BAD REQUEST, EMPTY FIELDS.");
		}
		else{
			//Compruebo si el dato recibido ya existe
			/*
			var filtered_data = edq_stats.filter((data) => {
				return ( (data.country == newData.country && data.year == newData.year));
			});
			*/
		
			db.find({country: newData.country, year: newData.year},(err, data) =>{
				if(data.length > 0){
					response.sendStatus(409, "GIVEN DATA ALREADY EXISTS");
				}
				else{
					db.insert(newData);
					response.sendStatus(201,"CREATED");
				}
			});

			
		}


	});

	//DELETE COLECCIÓN DATOS ACTUALIZADO
	app.delete(BASE_API_URL+"/edq-stats/:param", (request,response) =>{

		var param_country = request.params.param;

		/*
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
		*/
		db.remove({country: param_country}, { multi: true }, function (err, numRemoved) {
		});
		
		response.sendStatus(200, "DELETED DATA");

	});

	//PUT DATOS ¡NO PERMITIDO!
	app.put(BASE_API_URL+"/edq-stats",(request,response) =>{
		response.sendStatus(405, "METHOD NOT ALLOWED ON A COLLECTION.")
	});

	//GET DATO ESPECIFICO ACTUALIZADO
	app.get(BASE_API_URL+"/edq-stats/:param1/:param2",(request,response) =>{

		var param_country = request.params.param1;
		var param_year = request.params.param2;
		/*
		var filtered_data = edq_stats.filter((data) => {
			return ( (data.country == param1 && data.year == param2) || (data.country == param2 && data.year == param1));
		});
		*/
		
		db.find({country: param_country, year: param_year}, (err, data) =>{
			if(data.length > 0){
				
				data.forEach( (d) => {
					delete d._id;
				});
				
				response.send(JSON.stringify(data,null,2));
			}
			else{
				response.sendStatus(404, "DATA NOT FOUND.");
			}
		});

	});

	//POST DATO ESPECIFICO ¡NO PERMITIDO!
	app.post(BASE_API_URL+"/edq-stats/:param1/:param2",(request,response) =>{
		response.sendStatus(405, "METHOD NOT ALLOWED ON A SINGLE DATA.");
	});

	//DELETE DATO ESPECIFICO ACTUALIZADO
	app.delete(BASE_API_URL+"/edq-stats/:param1/:param2", (request,response) =>{

		var param_country = request.params.param1;
		var param_year = request.params.param2;

		/*
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
		*/
		
		db.remove({country: param_country, year: param_year}, { multi: true }, function (err, numRemoved) {
		});
		
		response.sendStatus(200, "DELETED DATA");

	});

	//PUT DATO ESPECIFICO ACTUALIZADO
	app.put(BASE_API_URL+"/edq-stats/:param1/:param2", (request,response) =>{
		var param_country = request.params.param1;
		var param_year = request.params.param2;

		/*
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
		*/
		
		db.find({country: param_country, year: param_year}, (data, error) =>{
			if(data.length > 0){
				var newData = request.body;
				
				data.edq_sg = newData.edq_sg;
				data.edq_gee = newData.edq_gee;
				data.edq_ptr = newData.edq_ptr;
				
				response.sendStatus(200, "DONE");
			}
			else{
				response.sendStatus(404, "DATA NOT FOUND");
			}
		});
		

	});
	
};