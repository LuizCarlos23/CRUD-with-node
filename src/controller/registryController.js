const connetion = require("../database/dbConnect");
const checkParams = require("../checkParameters");
const registerUser = require("../registerDeleteAndSearch/registerUser");

const controllerRegisterUser = (req, res) => {
	let params = req.body;
	console.log(params)
	let checkResults = checkParams(params);
	console.log(checkResults)
	if (checkResults["error"]) { return res.send(JSON.stringify(checkResults))};

	let name = req.body.name,
	 	age = req.body.age,
	 	rg = req.body.rg,
	 	cpf = req.body.cpf;

	registerUser(name, age, rg, cpf).
		then((result) => {
			console.log(result)
			return res.status(201).send(JSON.stringify(result));
		}).
		catch((error) => {
			return res.status(200).send(JSON.stringify(error));
		});
	
}

module.exports = controllerRegisterUser;