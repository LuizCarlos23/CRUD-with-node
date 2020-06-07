// Check if the parameters are valid
function checkParameters(params){
	let scanResults = {
		checkKeys: checkKeys(params),
		allIsString: allIsString(Object.values(params)),
		checkRg: checkRg(params.rg),
		checkCPF: checkCPF(params.cpf)
	}
	let result = checkResults(scanResults)
	return result
}
function allIsString(dado){
	let isString = dado.every((item) => {
		return typeof(item) == "string" 
	}) 
	return isString
}

function checkKeys(obj){
	let keys = Object.keys(obj)
	let baseParams = ['name', 'age', 'cpf', 'rg']
	if ((keys.length != baseParams.length)){ return false }
	for (let item in obj){
		if ((baseParams.indexOf(item) == -1)){return false}
	}
	return true
}

function checkCPF(cpf){
	if(cpf.length != 11){ return false }
	// Variable declarations
	let firstCheckerNumber = cpf[(cpf.length)-2],
		secondCheckerNumber = cpf[(cpf.length)-1],
		firstNineNumbers = cpf.substr(0, 9),
		calculationResult = undefined,
		scanResult = undefined;

	function calculationCPF(cpf, length, start=1){
		let sumResult = 0, restOfDivision = 0;
		for (let index in length){
			let number = cpf[index]
			let weight = parseInt(index)+start
			let multiplicationResult = number * weight
			sumResult += multiplicationResult
		}
		restOfDivision = sumResult % 11
		return restOfDivision
	}

	function checkNumberChecker(number, calculationResult){
		let result;
		if (number == 0){
			result = ((calculationResult == 10) || (calculationResult == 0))
		} else {
			result = (calculationResult == number)
		}
		return result
	}

	calculationResult = calculationCPF(cpf, firstNineNumbers)

	//Check First Checker Number
	scanResult = checkNumberChecker(firstCheckerNumber, calculationResult)
	if ( !scanResult ){ return false }

	// Check Second Checker Number
	let firstNineNumbersAndFirstChecker = firstNineNumbers + firstCheckerNumber
	calculationResult = calculationCPF(cpf, firstNineNumbersAndFirstChecker, 0)
	scanResult = checkNumberChecker(secondCheckerNumber, calculationResult)
	if ( !scanResult ){ return false }

	return true

}

function checkRg(rg){
	if (!Number.isInteger(parseInt(rg))) return false
	if (rg.length != 9) return false
	return true
}

function checkResults(scanResults){
	let result = {error: true, msg: undefined, scanResults}
	
	if(!scanResults.checkKeys){
		result["msg"] = "Invalid keys"
		return result
	} else if(!scanResults.allIsString){
		result["msg"] = "Everyone needs to be string"
		return result
	} else if (!scanResults.checkCPF){ 
		result["msg"] = "Invalid CPF"
		return result
	} else if (!scanResults.checkRg){
		result["msg"] = "Invalid Rg"
		return result
	} else {
		result["error"] = false
		result["msg"] = "It okay"
		return result
	}
}

module.exports = checkParameters