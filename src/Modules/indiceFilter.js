const geral = require("./geral.js")

const indice_Filter = function indiceFilter(type,cpf,indInicial,indFinal){


    
    let listaGeral = geral.dirFile(`./dados/indice_${type}`)
    let listaReturn = []
    for(let i = 0 ; i < listaGeral.length ; i++){
        let list = geral.readF(type,listaGeral[i])
        let full = geral.dataObj(list,false)
        let filtrados = full.filter((item)=>{
            return (item.indice >= indInicial && item.indice <= indFinal) && (item.cpf == cpf)
        })
        if(filtrados.length > 1 ){
            listaReturn.push(...filtrados)
        }
        
    }

    function compare( a, b ) {
        if ( a.indice < b.indice ){
          return -1;
        }
        if ( a.indice > b.incide ){
          return 1;
        }
        return 0;
      }
      
    listaReturn.sort( compare );
    return listaReturn
}

module.exports = {
    indiceFilter: indice_Filter
};