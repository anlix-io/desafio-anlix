const pacientsList = require("../../dados/pacientes.json");
const geral = require("./geral.js")

function cpfCardiaco(cpf,date){
    let dataCardiacoList = geral.searchCpf(cpf, "cardiaco" ,date)
    let objIndices = geral.dataObj(dataCardiacoList,true)
    return objIndices
}

function cpfPulmonar(cpf,date){
    let dataPulmonarList = geral.searchCpf(cpf, "pulmonar" ,date)
    let objIndices = geral.dataObj(dataPulmonarList,true)
    return objIndices
}

const create_Geral_Date = function createGeralDate(date){
    listaGeral = []
    for(let i = 0 ; i < pacientsList.length ; i++){
        let cpf = pacientsList[i].cpf
        objMaster = {}
        objtype = {}
        objMaster["nome"] = pacientsList[i].nome
        objMaster["cpf"] = cpf
        objMaster["typeIndice"] = objtype
        objtype["cadiaco"] = cpfCardiaco(cpf,date)
        objtype["Pulmonar"] = cpfPulmonar(cpf,date)

        listaGeral.push(objMaster)
    }     
    return listaGeral
}

module.exports = {
    createGeralDate: create_Geral_Date
};  