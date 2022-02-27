import indice_pulmonar from '../../../../public/database/indice_pulmonar/indice_pulmonar.json'
import PatientData from '../../../../public/database/pacientes.json'

export default {
    ExamePulmonary: {
        paciente: async (patientSearch) => await PatientData.filter( patient => patient.cpf === patientSearch.CPF),
    },
    Query: {
        getExamsPulmonary: async () => await indice_pulmonar.map( exam => { 
            return { data: exam.data, exame: exam.dados } }),

        getExamPulmonaryByCpf: (_,{CPF} ) => indice_pulmonar.map( exam => { 
            return ({ data: exam.data, exame: exam.dados.filter( patient => patient.CPF === CPF) })}),
    
        getExamPulmonaryByDateAndCpf: async (_,{data, CPF} ) => {
            let filterDateExam = await indice_pulmonar.filter( exam => exam.data === data )[0]
            let filterCpfPatient = filterDateExam.dados.filter( patient => patient.CPF === CPF)
            const resultSearch = [{ data: data, exame: filterCpfPatient}]
            return resultSearch
        },

        getExamPulmonaryByDate: async (_,{data} ) => {
            let filterDataExam = await indice_pulmonar.filter(exam => exam.data === data)[0]
            const resultSearch = [{ data: filterDataExam.data, exame: filterDataExam.dados}]
            return resultSearch
        },

        getExamPulmonaryWithInterval: async (_, {dataInicial, dataFinal, CPF}) => {
            let getDatesExams = await indice_pulmonar.map(exam => exam.data)
            let dateInitial = getDatesExams.indexOf(dataInicial)
            let dateFinal = Number(getDatesExams.indexOf(dataFinal)) + 1
            let getExamInterval = indice_pulmonar.slice(dateInitial, dateFinal)
            const resultSearch = getExamInterval.map( exam => ( {data: exam.data, exame: exam.dados.filter( patient => patient.CPF === CPF)} ))
            return resultSearch
        },

        getExamPulmonaryWithIntervalValue: async (_, {valorInicial, valorFinal, CPF}) => { return (indice_pulmonar.map( exam => { 
            return ({ 
                data: exam.data, 
                exame: exam.dados.filter( patient => patient.CPF === CPF)
                .filter( item => item.ind_card >= valorInicial && item.ind_card <= valorFinal )
            }) 
        }))
        },
    }
}