const path = require("path")
const express = require("express");
const bodyParser = require("body-parser");
const createTable = require("./src/database/createTables");

const routes = require("./src/routes");
const app = express();
const port = 9735;

//Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")))
app.set("views", path.join(__dirname+"/views"))
app.set("view engine", "pug")
app.use("/", routes);

app.listen(port, () => {
	console.log("\nEscutando na porta: "+port)
});