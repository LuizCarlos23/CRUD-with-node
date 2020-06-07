const connection = require("../database/dbConnect")
const registerUser = (name, age, rg, cpf) => {
	let query = `INSERT INTO users (name, age, rg, cpf) VALUES (?,?,?,?)`
	let sql = new Promise ((resolve, reject) => {
		connection.query(query,[name, age, rg, cpf], (err, result, fields)=> {
			if (err) return reject({error: err, msg: "Error while register"})
			return resolve({error: err, msg: "It Okay"})
		})
	})
	return sql
}

module.exports = registerUser