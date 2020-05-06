const express = require("express");
const bodyParser = require("body-parser"); 
const path = require("path");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 80;
app.use("/", express.static("./public"));


//API Jairo
const edq_stats_API = require(path.join(__dirname,"/src/back/edq_stats_API"));
edq_stats_API(app);

//API Enrique
const emp_stats_API_v2 = require(path.join(__dirname,"/src/back/emp_stats_API/v2"));
const emp_stats_API_v1 = require(path.join(__dirname,"/src/back/emp_stats_API/v1"));
emp_stats_API_v2(app);
emp_stats_API_v1(app);

//API Liz
const womanAPI = require(path.join(__dirname,"/src/back/womanresearchers_stats_API"));
womanAPI(app);


app.listen(port, () => {
	console.log("Server ready!");
});

console.log("Starting server...");