const express = require("express");
const routes = express.Router();
const deleteUser = require("./registerDeleteAndSearch/deleteUser") 
const searchUser = require("./registerDeleteAndSearch//searchUser")
const controllerRegisterUser = require("./controller/registryController")
const controllerDeleteUser = require("./controller/deleteController")
const userResearchController = require("./controller/searchController")

routes.get(["/", "/register"], (req, res) => {
	return res.render("index");
}) 

routes.get("/search", (req, res) => {
	return res.render("search")
})

// Rota para cadastrar um usuario no db. 
// Essa rota precisa de 4 parametros -> name, age, rg, cpf
routes.post("/register", controllerRegisterUser)

// Rota para deletar um registro do db. 
// Essa rota precisa de 1 parametro -> id
routes.post("/deleteUser", controllerDeleteUser)

// Rota para pesquisar um registro no db.
// Essa rota precisa de 2 parametro -> searchFor e value
// searchFor é necessario ser 'all', 'name', 'age', 'rg' ou 'cpf'.
routes.post("/search", userResearchController)
module.exports = routes