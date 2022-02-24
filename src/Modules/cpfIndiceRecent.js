const geral = require("./geral.js")
const pacientsList = require("../../dados/pacientes.json");

function indiceRecente(typeIndice){
    let listNameFile = geral.dirFile(`./dados/indice_${typeIndice}`)   
    let objDates = geral.percorrerAndModify(listNameFile)
    let recent = geral.dataDirRecent(objDates)
    return recent
}

function ReturnDataIndiceRecent(ObjPessoas){
    let listReturn = [];
    for(i = 0 ; i < ObjPessoas.length ; i++){
        let dataRecent = ObjPessoas[i].date
        listReturn.push(dataRecent)
    }
    let recenteDate = geral.dataRecent(listReturn)
    return recenteDate
}

function SearchCpfDateIndiceRecent(ObjPessoas,DateRecent){
    let result = ObjPessoas.find( obj => obj.date == DateRecent)
    return result
}

function ConsultaArchiveCpfIndiceRecent(cpf,typeIndice){
    let recent = indiceRecente(typeIndice)
    let list = geral.searchCpf(cpf, typeIndice ,recent)
    let ObjPessoas = geral.dataObj(list,)
    let DateRecent = ReturnDataIndiceRecent(ObjPessoas)
    let result = SearchCpfDateIndiceRecent(ObjPessoas,DateRecent)
    return result
}

const Consult_Archive_Cpf_Indice_Recent = function ConsultArchiveCpfIndiceRecent(cpf,typeIndice){
    let recent = indiceRecente(typeIndice)
    let list = geral.searchCpf(cpf, typeIndice ,recent)
    let ObjPessoas = geral.dataObj(list,)
    let DateRecent = ReturnDataIndiceRecent(ObjPessoas)
    let result = SearchCpfDateIndiceRecent(ObjPessoas,DateRecent)
    return result
}

const create_Obj_Pessoa_Type = function createObjPessoa_Type(cpf,typeIndice){
    let resp = ConsultaArchiveCpfIndiceRecent(cpf,typeIndice)

    let find = pacientsList.find(f => f.cpf == cpf)

    let newObj = {}
    newObj["nome"] = find.nome
    newObj["idade"] = find.idade
    newObj["cpf"]=find.cpf
    newObj["tipoIndice"]=typeIndice
    newObj["dataIndice"]=geral.translateEpoch(resp.date)
    newObj["numeberIndice"]=resp.indice

    return newObj
}

module.exports = {
    ConsultArchiveCpfIndiceRecent: Consult_Archive_Cpf_Indice_Recent,
    createObjPessoa_Type: create_Obj_Pessoa_Type
};