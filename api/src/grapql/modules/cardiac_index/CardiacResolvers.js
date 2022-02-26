import indice_cardiaco from '../../../../public/database/indice_cardiaco/indice_cardiaco.json'

export default { 
    Query: {
        cardiacIndexs: async () => await indice_cardiaco.map( exam => { 
        return { data: exam.data, exame: exam.dados } }),

        cardiac: (_,{CPF} ) => indice_cardiaco.map( exam => { 
            return ({ data: exam.data, exame: exam.dados.filter( patient => patient.CPF === CPF) })}),
    }
}