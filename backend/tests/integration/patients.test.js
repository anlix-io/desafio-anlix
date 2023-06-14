const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Looking for patients and diseases in route /patient', function () {
  it('/:name returns a list of all patients that have the string in their name', async function () {
      const response = await chai.request(app).get('/patient/name=ale');

      expect(response.status).to.be.equal(200);
      expect(response.body.result).to.have.lengthOf(3);
  });

  it('/:name/:disease returns the most recent patient information', async function () {
      const response = await chai.request(app).get('/patient/name=ale/disease=pulmonar');

      const output = {
        "mostRecentCharacteristic": {
          "cpf": "974.642.524-20",
          "epoch": "1624255351",
          "ind": "0.085284"
        }
      }

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(output);
  });

  it('/:name/diseases/info returns the patient\'s cpf and its two most recent characteristics', async function () {
      const response = await chai.request(app).get('/patient/name=ale/diseases/info');

      const output = {
        "latestPatientInformations": {
          "patient": "974.642.524-20",
          "ind_card": {
            "epoch": "1624330210",
            "ind": "0.662953"
          },
          "ind_pulm": {
            "epochPulm": "1624255351",
            "indPulm": "0.085284"
          }
        }
      }

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(output);
  });
});