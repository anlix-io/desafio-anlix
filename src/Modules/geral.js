const fs =  require("fs");


function readF(typeIndice,date){
    const data = `./dados/indice_${typeIndice}/`
    let buffer = fs.readFileSync(data + date)
    let content = buffer.toString();
    let linhaList = content.split(/\r?\n/);
    return linhaList
}
const read_File = function readF(typeIndice,date){
    const data = `./dados/indice_${typeIndice}/`
    let buffer = fs.readFileSync(data + date)
    let content = buffer.toString();
    let linhaList = content.split(/\r?\n/);
    return linhaList
}

const data_Recent = function dataRecent(datapessoalist){
    let lista = [];
    for(i = 0 ; i < datapessoalist.length ; i++ ){
        let time = datapessoalist[i];
        lista.push(time);
    }
    return Math.max(...lista);
}

const search_Cpf = function searchCpf(numberCPF, typeIndice ,dateIndice){
    let list = readF(typeIndice, dateIndice)
    let res = list.filter(cpf => cpf.includes(numberCPF))
    return res; //não resolvido.
}

function translateEpoch(dateEpoch){
    let myDate = new Date(dateEpoch*1000);
    return myDate.toLocaleString(); //traduz data do tipo epoch para data(dd/mm/yyyy)
}

const translate_Epoch = function translateEpoch(dateEpoch){
    let myDate = new Date(dateEpoch*1000);
    return myDate.toLocaleString(); //traduz data do tipo epoch para data(dd/mm/yyyy)
}
//====================================================================//

const dir_File = function dirFile(dir){
    let listdir = fs.readdirSync(dir)
    return listdir // retorna lista de um diretório
}

function modifyArchiveDate(datastring){
    const add = "/";
    const position1 = 2;
    const position2 = 4;
    let output = [datastring.slice(0, position1), add , datastring.slice(2,position2), add , datastring.slice(position2)].join('');
    return output; // retorna data com formato dd/mm/yyyy
}

const length_And_Modify = function percorrerAndModify(list){
    let obj = {}
    let listDateFormat = [];

    for(let dateOld of list){
        //percorre a lista
        let dateFormat = modifyArchiveDate(dateOld);

        obj[dateFormat] = dateOld;

        listDateFormat.push(dateFormat);

    }
    let newObj = {}

    newObj["listDateFormat"] = listDateFormat;
    newObj["mapObj"] = obj;

    return newObj;
}

const data_Dir_Recent = function dataDirRecent(objDates){
        // espera uma lista = ["dd/mm/yyyy","dd/mm/yyyy",...]
        let DateRecent = objDates.listDateFormat.sort(function(a, b){
                var aa = a.split('/').reverse().join(),
                    bb = b.split('/').reverse().join();
                return aa < bb ? -1 : (aa > bb ? 1 : 0);
        });//retorna lista de datas ordenada, sendo a ultima mais recente
    let index = DateRecent.length-1
    let dateOld = DateRecent[index]
    let referenciaAntiga = objDates.mapObj[dateOld]
    return referenciaAntiga
}

const data_Obj = function dataObj( lista , flagFormat ){
    let listReturn = [];

    for ( i = 1 ; i < lista.length ; i ++ ){

        let arraySplit = lista[i].split(" ");
        //console.log(arraySplit)

        let obj = {}
        obj['cpf'] = arraySplit[0]

        if(flagFormat){
            let time = translateEpoch(arraySplit[1])
            obj['date'] = time
            
        }else{
            obj['date'] = arraySplit[1]
        }
        obj['indice'] = arraySplit[2] 
        listReturn.push(obj);
        
    }

    return listReturn;
}

const date_reformat = function dateReformat(date){
    let dateformat = date.replace("/","").replace("/","")
    return dateformat
}
module.exports = {
    readF: read_File ,
    dataRecent: data_Recent,
    searchCpf: search_Cpf,
    translateEpoch: translate_Epoch,
    dirFile: dir_File,
    percorrerAndModify: length_And_Modify,
    dataDirRecent: data_Dir_Recent,
    dataObj: data_Obj,
    dateReformat: date_reformat
};