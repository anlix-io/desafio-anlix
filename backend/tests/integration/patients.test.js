const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Looking for patients and diseases in route /patient', function () {
  it('/:name returns a list of all patients that have the string in their name', async function () {
      const response = await chai.request(app).get('/patient/ale');

      expect(response.status).to.be.equal(200);
      expect(response.body.result).to.have.lengthOf(3);
  });

  it('/:name/:disease returns the most recent patient information', async function () {
      const response = await chai.request(app).get('/patient/ale/pulmonar');

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
});