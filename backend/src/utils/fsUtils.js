const fs = require('fs');

const patients = require('../../dados/pacientes.json')
const ind_car_dir = 'backend/dados/indice_cardiaco';
const ind_pul_dir = 'backend/dados/indice_pulmonar';

const getPatientsByName = (query) => patients.filter((patient) => patient.nome.toLowerCase().includes(query.toLowerCase()));

module.exports = {
  getPatientsByName
}