const geral = require("./geral.js")
const pacientsList = require("../../dados/pacientes.json");

function convertDate(DataDDMMYY) {
    const dataSplit = DataDDMMYY.split("/");
    const novaData = new Date(parseInt(dataSplit[2], 10),
                  parseInt(dataSplit[1], 10) - 1,
                  parseInt(dataSplit[0], 10));
    return novaData;
}

function intervaloDate(datainicial,datafinal,listaDate){
        
    let dataInicial = convertDate(datainicial);
    let dataFinal = convertDate(datafinal);
    let Filtrados = listaDate.filter(result => {
     return convertDate(result) >= dataInicial && convertDate(result) <= dataFinal;
    }) 
    return Filtrados
}

function ListIndiceRecente(typeIndice){
    let listNameFile = geral.dirFile(`./dados/indice_${typeIndice}`)   
    let objDates = geral.percorrerAndModify(listNameFile)
    let recent = objDates.listDateFormat.sort(function(a, b){
        var aa = a.split('/').reverse().join(),
            bb = b.split('/').reverse().join();
        return aa < bb ? -1 : (aa > bb ? 1 : 0);
});
    return recent
}

const cpd_Date_person = function cpfDatePerson(cpf , typeIndice , dateInicial , dateFinal){
    let listaDate = ListIndiceRecente(type)
    let filterDate = intervaloDate(dateInicial,dateFinal,listaDate)
    let find = pacientsList.find(f => f.cpf == cpf)
    let objMaster = {}
    let conteudo = []
    objMaster["nome"] = find.nome
    objMaster["cpf"] = find.cpf
    objMaster["type"] = typeIndice
    objMaster["conteudo"] = conteudo
    for(let i = 0 ; i < filterDate.length ; i++){
        let teste = geral.searchCpf(find.cpf, typeIndice , geral.dateReformat(filterDate[i]))
        let obj = geral.dataObj(teste,true)
        conteudo.push(obj)
    }
    return objMaster
}

module.exports = {
    cpfDatePerson: cpd_Date_person
};  