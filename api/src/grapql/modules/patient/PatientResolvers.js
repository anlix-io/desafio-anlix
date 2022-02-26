import PatientData from '../../../database/pacientes.json'
import indice_cardiaco from '../../../database/indice_cardiaco/indice_cardiaco.json'
import indice_pulmonar from '../../../database/indice_pulmonar/indice_pulmonar.json'

export default {
    Patient: {
        indiceCardiaco: (patientData) => indice_cardiaco.map( exam => {
            return ({ data: exam.data, exame: exam.dados.filter( patient => patient.CPF === patientData.cpf) })}),
        indicePulmonar: (patientData) => indice_pulmonar.map( exam => {
            return ({ data: exam.data, exame: exam.dados.filter( patient => patient.CPF === patientData.cpf) })}),
    },
    Query: {
        patients: async () => await PatientData,

        getPatientByCPF: async (_, {cpf}) => await PatientData.filter( patient => patient.cpf === cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")),

        getPatientByCellPhone: async (_, {celular}) => await PatientData.find( patient => patient.celular === celular),

        getPatientByName: async (_, {nome}) => {
            nome = nome.toLowerCase()
            return( await PatientData.filter( 
            patient => patient.nome.toLowerCase().includes(nome)) )},
    }
}