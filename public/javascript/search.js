let searchFor = "name";
let form = document.querySelector("form");
let searchValue = undefined;
let users;
let btnCloseModal = document.getElementsByClassName("modal-close")[0],
	btnDeleteUser = document.getElementsByClassName("modal-deleteUser")[0];


function alterLabel(id){
	if (id == "all") { 
		searchFor = id;
		return document.querySelector("#searchValue").disabled = true;
	}
	document.querySelector("#searchValue").disabled = false 
	let labelSearchValue = document.querySelector('label[for="labelSearchValue"]');
	labelSearchValue.innerHTML = id;
	searchFor = id;
}

function createTables(data){
	let result = data.result
	document.querySelector("tbody").innerHTML = ""
	for (let index in result){

		let tdId = document.createElement("td"),
			tdName = document.createElement("td"),
			tdAge = document.createElement("td"),
			tdRg = document.createElement("td"),
			tdCpf = document.createElement("td");
		
		tdId.textContent = result[index]["id"];
		
		tdName.textContent = result[index]["name"]
		tdName.setAttribute("class", "name")
		
		tdAge.textContent = result[index]["age"]
		tdAge.setAttribute("class", "age")

		tdRg.textContent = result[index]["rg"]
		tdRg.setAttribute("class", "rg")

		tdCpf.textContent = result[index]["cpf"]
		tdCpf.setAttribute("class", "cpf")

		let tr = document.createElement("tr");

		tr.setAttribute("id", result[index]["id"]);
		tr.setAttribute("onclick", "openModal(this.id)");
		tr.appendChild(tdId);
		tr.appendChild(tdName);
		tr.appendChild(tdAge);
		tr.appendChild(tdRg);
		tr.appendChild(tdCpf);

		document.querySelector("tbody").appendChild(tr);
	}


}

function openModal(id){
	let modal = document.getElementById("modalUser"),
		modalContent = document.getElementsByClassName("modal-content")[0],
	 	user = document.getElementById(id),
		childs = user.childNodes

	let userId = childs[0].textContent,
		userName = childs[1].textContent,
		userAge = childs[2].textContent,
		userRg = childs[3].textContent,
		userCpf = childs[4].textContent

	document.querySelector("#modal-userId").textContent = `${userId}`;
	document.querySelector("#modal-userName").textContent = `Name : ${userName}`;
	document.querySelector("#modal-userAge").textContent = `Age : ${userAge}`;
	document.querySelector("#modal-userRg").textContent = `Rg : ${userRg}`;
	document.querySelector("#modal-userCpf").textContent = `CPF : ${userCpf}`;

	modal.style.display = "block";
}

function checkResult(data) {
	if (data["error"] != null){
		return document.querySelector("#msgError").innerHTML = data["msg"]
	}
	return createTables(data)
}


btnCloseModal.addEventListener("click", () => {
	let modal = document.getElementById("modalUser");
	modal.style.display = "none";
})

btnDeleteUser.addEventListener("click", (event) => {
	let modalCotnent = document.getElementsByClassName("modal-content")[0],
		userId = modalCotnent.childNodes[0].textContent[0]

	result = fetch("http://localhost:9735/deleteUser", {
		method: "POST",
		body: JSON.stringify({"id": userId}),
		headers: { "Content-Type": "application/json" }
	}).then(result => {
		return result.json();
	}).then(data => {
		console.log(data);
	}).catch(err => {
		console.log(err);
	})

	let modalClose = document.getElementsByClassName("modal-close")[0]
	modalClose.click()
})

form.addEventListener("submit", (event) => {
	searchValue = document.querySelector("#searchValue").value;
	event.preventDefault();
	let dados = {
		"value": searchValue,
		"searchFor": searchFor
	}

	fetch("http://localhost:9735/search", {
		method: "POST",
		body: JSON.stringify(dados),
		headers: { "Content-Type": "application/json" }
	}).then(result => {
		return result.json();
	}).then(data => {
		checkResult(data);
	}).catch(err => {
		console.log(err);
	})
	
})
