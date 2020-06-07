let form = document.querySelector("form");


function resetForm(){
	document.querySelector("#name").value = "";
	document.querySelector("#age").value = "";
	document.querySelector("#rg").value = "";
	document.querySelector("#cpf").value = "";
	document.querySelector("#message").value = "";
}

function checkResult(data) {
	console.log(data)
	if(!data["error"]){
		resetForm()
		document.querySelector('.helper-text-cpf').innerHTML = ""
		document.querySelector('.helper-text-rg').innerHTML = ""
		return document.querySelector("#message").innerHTML = "Registered  "
	}
	let cpfVerificationResult = data["scanResults"]["checkCPF"]
	let rgVerificationResult = data["scanResults"]["checkRg"]

	console.log(data)
	if (!cpfVerificationResult){
		document.querySelector('.helper-text-cpf').innerHTML = "CPF invalid"
		document.querySelector("#cpf").focus()
	} else if(!rgVerificationResult){
		document.querySelector('.helper-text-rg').innerHTML = "RG invalid"
		document.querySelector("#rg").focus()
	}
}


form.addEventListener("submit", (event) => {
	let name = document.querySelector("#name");
	let age = document.querySelector("#age");
	let rg = document.querySelector("#rg");
	let cpf = document.querySelector("#cpf");
	let message = document.querySelector("#message")

	event.preventDefault();
	let dados = {
		"name": name.value,
		"age": age.value,
		"rg": rg.value,
		"cpf": cpf.value
	}

	let result = fetch("http://localhost:9735/register", {
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
