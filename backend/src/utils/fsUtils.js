const fs = require('fs').promises;
const path = require('path');

const patients = require('../../dados/pacientes.json')
const ind_card_dir = path.resolve(__dirname, '../../dados/indice_cardiaco');
const ind_pulm_dir = path.resolve(__dirname, '../../dados/indice_pulmonar');

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

          if (cpf !== 'CPF' && cpf !== '') informationFound.push({cpf, epoch, ind})
      })
    }))
    return informationFound;
  } catch (error) {
    console.error(error);
  }
}

const isoDateConverter = (date) => {
  const day = date.slice(0, 2);
  const month = date.slice(2,4);
  const year = date.slice(4);
  return `${year}-${month}-${day}`;
}

const sortArchives = (archives) => {
  const isoDate = archives.map((archive) => isoDateConverter(archive));
  const objectDate = isoDate.map((date) => new Date(`${date} 00:00:01`));

  objectDate.sort((a,b) => a - b);

  const sortedDates = objectDate.map((date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() +1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}${month}${year}`
  })
  
  return sortedDates;
}

const getPatientsByName = (name) => patients.filter((patient) => patient.nome.toLowerCase().includes(name.toLowerCase()));

const getPatientByNameAndDisease = async (name, disease) => {
  const chosenDisease = disease === 'cardiaco' ? ind_card_dir : ind_pulm_dir;
  const archives = await readDir(chosenDisease);
  const patientsWithChosenDisease = await readArchivesAndSeparateByLine(archives, chosenDisease);
  const chosenPatient = getPatientsByName(name)[0].cpf;
  const chosenPatientDisease = patientsWithChosenDisease.filter((patient) => patient.cpf === chosenPatient);
  const mostRecentChar = chosenPatientDisease.sort((a,b) => Number(b.epoch) - Number(a.epoch))[0];
  return mostRecentChar
}

const getPatientAndDiseases = async (name) => {
  const {epoch, ind} = await getPatientByNameAndDisease(name, 'cardiaco');
  const {epoch: epochPulm, ind: indPulm} = await getPatientByNameAndDisease(name, 'pulmonar');
  const patient = getPatientsByName(name)[0].cpf;

  const latestPatientInformations = {
    patient,
    ind_card: {epoch, ind},
    ind_pulm: {epochPulm, indPulm}
  }

  return latestPatientInformations
}

const getAllCharByDate = async (paramDate) => {
  const patientsCardByDate = await readArchivesAndSeparateByLine([paramDate], ind_card_dir)
  const patientsPulmByDate = await readArchivesAndSeparateByLine([paramDate], ind_pulm_dir)

  if (!patientsCardByDate?.length && !patientsPulmByDate?.length ) return []

  const allCharByDate = {
    filter_date: paramDate,
    ind_card: patientsCardByDate,
    ind_pulm: patientsPulmByDate
  }

  return allCharByDate;
}

const getPatientCharByDateInterval = async ({name, disease, initial_date, final_date}) => {
  const chosenPatient = getPatientsByName(name)[0].cpf;
  const chosenDisease = disease === 'cardiaco' ? ind_card_dir : ind_pulm_dir;
  const archives = await readDir(chosenDisease);
  const sortedArchives = sortArchives(archives);

  const firstPosition = sortedArchives.indexOf(initial_date);
  const lastPosition = sortedArchives.indexOf(final_date);

  if (firstPosition === -1 || lastPosition === -1) return []

  const chosenIntervalInfos = sortedArchives.filter((_, index) => index >= firstPosition && index <= lastPosition);

  const allPatientsCharByIntervalDate = await readArchivesAndSeparateByLine(chosenIntervalInfos, chosenDisease);
  const specificPatientChar = allPatientsCharByIntervalDate.filter((patient) => patient.cpf === chosenPatient);

  const indKeyName = disease === 'cardiaco' ? 'ind_card' : 'ind_pulm';

  const patientCharByDateInterval = {
    patient: chosenPatient,
    initial_date,
    final_date,
    [indKeyName]: specificPatientChar,
  }

  return patientCharByDateInterval
}

const getLatestCharByPatientAndIndAndDisease = async ({name, disease, initial_ind, final_ind}) => {
  const chosenPatient = getPatientsByName(name)[0].cpf;
  const chosenDisease = disease === 'cardiaco' ? ind_card_dir : ind_pulm_dir;
  const indKeyName = disease === 'cardiaco' ? 'ind_card' : 'ind_pulm';

  const archives = await readDir(chosenDisease);
  const patientsWithChosenDisease = await readArchivesAndSeparateByLine(archives, chosenDisease);
  const charsInSpecifiedIndInterval = patientsWithChosenDisease.filter((char) => Number(char.ind) >= Number(initial_ind) && Number(char.ind) <= Number(final_ind));

  if (!charsInSpecifiedIndInterval.length) return []

  const mostRecentCharacteristic = charsInSpecifiedIndInterval.sort((a,b) => Number(b.epoch) - Number(a.epoch))[0];

  const latestCharEqualToSpecifiedIndAndDisease = {
    patient: chosenPatient,
    initial_ind,
    final_ind,
    [indKeyName]: {
      mostRecentCharacteristic
    }
  }

  return latestCharEqualToSpecifiedIndAndDisease
}

module.exports = {
  getPatientsByName,
  getPatientByNameAndDisease,
  getPatientAndDiseases,
  getAllCharByDate,
  getPatientCharByDateInterval,
  getLatestCharByPatientAndIndAndDisease
}
