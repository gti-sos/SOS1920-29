const express = require("express");
const bodyParser = require("body-parser"); 
const path = require("path");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 80;
app.use("/", express.static("./public"));


//API Jairo
const edq_stats_API = require(path.join(__dirname,"edq_stats_API"));
edq_stats_API(app);

//API Enrique
const emp_stats_API = require(path.join(__dirname,"emp_stats_API"));
emp_stats_API(app);

//API Liz
const womanAPI = require(path.join(__dirname,"womanresearchers_stats_API"));
womanAPI(app);


const BASE_API_URL = "/api/v1";




app.listen(port, () => {
	console.log("Server ready!");
});

console.log("Starting server...");