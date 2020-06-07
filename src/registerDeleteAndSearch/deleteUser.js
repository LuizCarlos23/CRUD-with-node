const connection = require("../database/dbConnect")
const deleteUser = (id) => {
	let query = `DELETE FROM users WHERE id = ?`
	let sql = new Promise ((resolve, reject) => {
		connection.query(query, [id], (err, result, fields) => {
			if (!result.affectedRows) return reject({error: err, msg: "Does not exist"})
			if (err) return reject({error: err, msg: "Error while ao deleting"})
			return resolve({error: err, msg: "It Okay"})
		})
	})
	return sql
}

module.exports = deleteUser