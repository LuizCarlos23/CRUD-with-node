const searchUser = (searchFor, value=undefined) => {
	const connection = require("../database/dbConnect")
	let query;

	if (searchFor == "all"){
		query = "SELECT * FROM users"
	} else if (searchFor == "name") {
		query = `SELECT * FROM users WHERE name LIKE "%${value}%"`
	} else {
		query = `SELECT * FROM users WHERE ${searchFor} = ${value}`
	}
	let sql = new Promise((resolve, reject) => {
		connection.query(query, [value],  (err, result) => {
			if (err) {
				connection.end()
				return reject({error: err, msg: "Error while search", result: result})
			}
			return resolve({error: err, msg: "It Okay", result: result})
		})
	})
	
	return sql
}

module.exports = searchUser