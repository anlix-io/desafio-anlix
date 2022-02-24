const CpfIndiceRecent = require("./cpfIndiceRecent.js")
const geral = require("./geral.js")
const pacientsList = require("../../dados/pacientes.json");


const create_Obj_Person_Geral = function createObjPersonGeral(cpf){

    let resp1 = CpfIndiceRecent.ConsultArchiveCpfIndiceRecent(cpf,"cardiaco")
    let resp2 = CpfIndiceRecent.ConsultArchiveCpfIndiceRecent(cpf,"pulmonar")

    let find = pacientsList.find(f => f.cpf == cpf)
    
    delete resp1.cpf
    delete resp2.cpf

    resp1.date = geral.translateEpoch(resp1.date)
    resp2.date = geral.translateEpoch(resp2.date)

    let newObj = {}
    newObj["nome"] = find.nome
    newObj["idade"] = find.idade
    newObj["cpf"] = find.cpf
    newObj["typeIndiceCardiaco"] = resp1
    newObj["typeIndicePulmonar"] = resp2
    
    return newObj
}

module.exports = {
    createObjPersonGeral: create_Obj_Person_Geral
};