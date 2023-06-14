const fs = require('fs').promises;
const path = require('path');

const patients = require('../../dados/pacientes.json')
const ind_car_dir = path.resolve(__dirname, '../../dados/indice_cardiaco');
const ind_pul_dir = path.resolve(__dirname, '../../dados/indice_pulmonar');

const readDir = async (dir) => {
  try {
    const files = await fs.readdir(dir);
    return files
  } catch (error) {
    console.error(error);
  }
}

const readArchivesAndSeparateByLine = async (archives, chosenDisease) => {
  try {
    informationFound = [];

    await Promise.all(archives.map(async (archive) => {
      const completePath = path.join(chosenDisease, archive);
      
      const data = await fs.readFile(completePath, 'utf8');

      const lines = data.split('\n');

      lines.forEach((line) => {
          const [cpf, epoch, ind] = line.split(' ');

          if (cpf !== 'CPF') informationFound.push({cpf, epoch, ind})
      })
    }))
    return informationFound;
  } catch (error) {
    console.error(error);
  }
}

const getPatientsByName = (query) => patients.filter((patient) => patient.nome.toLowerCase().includes(query.toLowerCase()));

const getPatientsByNameAndDisease = async (name, disease) => {
  const chosenDisease = disease === 'cardiaco' ? ind_car_dir : ind_pul_dir;
  const archives = await readDir(chosenDisease);
  const patientsWithChosenDisease = await readArchivesAndSeparateByLine(archives, chosenDisease);
  const chosenPatient = getPatientsByName(name)[0].cpf;
  const chosenPatientDisease = patientsWithChosenDisease.filter((patient) => patient.cpf === chosenPatient);
  const mostRecentChar = chosenPatientDisease.sort((a,b) => Number(b.epoch) - Number(a.epoch))[0];
  
  return mostRecentChar
}

module.exports = {
  getPatientsByName,
  getPatientsByNameAndDisease
}