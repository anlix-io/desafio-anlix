import indice_pulmonar from '../../../../public/database/indice_pulmonar/indice_pulmonar.json'

export default { 
    Query: {
        pulmonaryIndexs: async () => await indice_pulmonar.map( exam => { 
        return { data: exam.data, exame: exam.dados } }),

        pulmonary: (_,{CPF} ) => indice_pulmonar.map( exam => { 
            return ({ data: exam.data, exame: exam.dados.filter( patient => patient.CPF === CPF) })}),
    }
}