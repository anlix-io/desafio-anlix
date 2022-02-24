const express = require("express");
const app = express();
const pacientsList = require("../dados/pacientes.json");
const geral = require("./Modules/geral.js");
const indiceCpfDate = require("./Modules/indiceCpfDate.js");
const dataGeral = require("./Modules/dataGeral.js");
const CpfIndiceRecent = require("./Modules/cpfIndiceRecent.js");
const CpfRecent = require("./Modules/cpfRecent.js");
const indiceFilter = require("./Modules/indiceFilter.js");
app.use(express.json());


//=============================================================================================================================
//Consultar, para cada paciente, cada uma das características individualmente e cada uma delas sendo a mais recente disponível;
app.get('/cpfIndiceRecent', (req, res) => {
    
    let cpf = req.query.cpf
    let typeIndice = req.query.typeIndice

    let result = CpfIndiceRecent.createObjPessoa_Type(cpf,typeIndice)
    return res.json(result);

});

//===================================================================================================================
//* Consultar em uma única chamada, todas as características de um paciente, com os valores mais recentes de cada uma;
app.get('/cpfRecent', (req, res) => {
    
    let cpf = req.query.cpf

    let result = CpfRecent.createObjPersonGeral(cpf)
    return res.json(result);

});

//===================================================================================================================================
//* Consultar para uma determinada data (dia, mês e ano), todas as características existentes de todos os pacientes da base de dados;
app.get('/dataGeral', (req, res) => {

    let date = req.query.date
    let dateFormat = geral.dateReformat(date)

    let result = dataGeral.createGeralDate(dateFormat)
    
    return res.json(result);
});

//===================================================================================================================================
//* Consultar uma característica qualquer de um paciente para um intervalo de datas a ser especificado na chamada da API;
app.get('/indiceCpfDate', (req, res) => {
    
    cpf = req.query.cpf
    type = req.query.typeIndice
    inicialDate = req.query.dateInicial
    FinalDate = req.query.dateFinal
    
    let result = indiceCpfDate.cpfDatePerson(cpf , type , inicialDate , FinalDate)
    
    return res.json(result);

});

//===================================================================================================================================================
//* Consultar o valor mais recente de uma característica de um paciente que esteja entre um intervalo de valores a ser especificado na chamada da API;
app.get('/indiceFilter', (req, res) => {
    
        let cpf = req.query.cpf
        let type = req.query.typeIndice
        let indiceInicial = req.query.indiceInicial
        let indiceFinal = req.query.indiceFinal


        let find = pacientsList.find(f => f.cpf == cpf)
        let conteudo_Filtrado = indiceFilter.indiceFilter(type,cpf,indiceInicial,indiceFinal)
            objCpfIndice = {
                nome:       find.nome,
                cpf:        find.cpf,
                typeIndice: type,
                conteudo:   conteudo_Filtrado
            }
        return res.json(objCpfIndice);
           
})

//=====================================================================================================
//* Consultar pacientes que contenham um nome ou parte de um nome a ser especificado na chamada da API.
app.get('/pacients', (req, res) => {

    try {

        let nome = req.query.nome;
        let retornoNome = pacientsList.filter((item)=>{

            if(item.nome){
                let nomeminusculo = item.nome.toLowerCase();
                return nomeminusculo.includes(nome)
            }

        })

        if(retornoNome.length == 0){
            throw {
                statusCode: 404,
                message:"O nome procurado não se encontra no banco de dados"
            };
        }

        return res.json(retornoNome);
     
    }catch (e) {

        let error = {
            statusCode: 500,
            erro: e.message
        }

        if(e.statusCode){
            error.statusCode = e.statusCode
        }

        res.statusCode = error.statusCode;
        return res.json(erro);
        // declarações para manipular quaisquer exceções
        //console.log(e); // passa o objeto de exceção para o manipulador de erro

     }

    
})


app.listen(3000, () => {
    console.log("ServerON")
});