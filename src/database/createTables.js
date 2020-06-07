const connetion = require("./dbConnect")

const createTable = ((resolve, reject) => {
	let sqlQuery = `CREATE TABLE  users 
	(
	id INT AUTO_INCREMENT NOT NULL, 
	name VARCHAR(255) NOT NULL, 
	age INT NOT NULL, 
	rg VARCHAR(11) NOT NULL, 
	cpf VARCHAR(11) NOT NULL , 
	PRIMARY KEY(id)
	)`
	connetion.query(sqlQuery, (err, result, fields) => {
		if (err) return err
	})
})

module.exports = createTable()