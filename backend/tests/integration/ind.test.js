const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Looking for patients and diseases in route /ind', function () {
  it('/name=:name/disease=:disease/initial_ind=:initial_ind/final_ind=:final_ind returns the most recent index that is equal to the specified index and disease', async function () {
    const response = await chai.request(app).get('/ind/name=ale/disease=cardiaco/initial_ind=0.6/final_ind=0.7');

    const output = {
      "patient": "974.642.524-20",
      "initial_ind": "0.6",
      "final_ind": "0.7",
      "ind_card": {
        "mostRecentCharacteristic": {
          "cpf": "810.489.602-42",
          "epoch": "1624330533",
          "ind": "0.610690"
        }
      }
    }

    expect(response.status).to.be.equal(200);
    expect(response.body.latestCharEqualToSpecifiedIndAndDisease).to.have.all.keys('patient', 'initial_ind', 'final_ind', 'ind_card');
    expect(response.body.latestCharEqualToSpecifiedIndAndDisease).to.be.deep.equal(output);
  });
  it('/name=:name/disease=:disease/initial_ind=:initial_ind/final_ind=:final_ind returns an error message if no result is found within the range of specified indexes', async function () {
    const response = await chai.request(app).get('/ind/name=ale/disease=cardiaco/initial_ind=0.00001/final_ind=0.00003');

    expect(response.status).to.be.equal(404);
    expect(response.body.message).to.be.equal('Specified Index Not Found');
  });
});