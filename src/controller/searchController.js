const connetion = require("../database/dbConnect");
const searchUser = require("../registerDeleteAndSearch/searchUser");

const userResearchController = (req, res) => {
	let acceptableValues = ['all', 'name', 'age', 'rg', 'cpf'] 
	let searchFor = req.body.searchFor.toLowerCase(),
		value = req.body.value
	console.log(req.body)
	if (acceptableValues.indexOf(searchFor) == -1){ 
		return res.status(400).send(JSON.stringify({error: true,msg: "Unacceptable value"}))
	}
	
	searchUser(searchFor, value).
		then((result) => {
			return res.status(200).send(JSON.stringify(result));
		}).
		catch((err) => {
			console.log(err)
			return res.status(400).send(JSON.stringify(err));
		})
}

module.exports = userResearchController