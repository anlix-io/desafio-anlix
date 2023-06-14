const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Looking for patients and diseases in route /ind', function () {
  it('/:name/:disease/:initial_ind/:final_ind returns the most recent index that is equal to the specified index and disease', async function () {
    const response = await chai.request(app).get('/ind/ale/cardiaco/0/0.6666666');

    const output = {
      "patient": "974.642.524-20",
      "initial_ind": "0",
      "final_ind": "0.6666666",
      "ind_card": {
        "mostRecentCharacteristic": {
          "cpf": "810.489.602-42",
          "epoch": "1624330573",
          "ind": "0.078629"
        }
      }
    }

    expect(response.status).to.be.equal(200);
    expect(response.body.latestCharEqualToSpecifiedIndAndDisease).to.have.all.keys('patient', 'initial_ind', 'final_ind', 'ind_card');
    expect(response.body.latestCharEqualToSpecifiedIndAndDisease).to.be.deep.equal(output);
  });
});