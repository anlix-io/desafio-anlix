const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Looking for patients and diseases in route /date', function () {
  it('/:date returns a list of all patients and characteristics for the date', async function () {
      const response = await chai.request(app).get('/date/01062021');

      expect(response.status).to.be.equal(200);
      expect(response.body.allCharByDate).to.have.all.keys('filter_date', 'ind_card', 'ind_pulm');
  });

  it('/:date returns message saying that it did not find the information by the date entered when it does not find the data in this case', async function () {
      const response = await chai.request(app).get('/date/01062019');

      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal('Specified Date Not Found');
  });

  it('/:name/:disease/:initial_date/:final_date returns message saying that it did not find the information by the date entered when it does not find the data in this case', async function () {
      const response = await chai.request(app).get('/date/ale/cardiaco/04042021/01062021');

      expect(response.status).to.be.equal(200);
      expect(response.body.patientCharByDateInterval).to.have.all.keys('patient', 'initial_date', 'final_date', 'ind_card');
  });

  it('/:name/:disease/:initial_date/:final_date returns an error message when the date range is not in the list', async function () {
      const response = await chai.request(app).get('/date/ale/cardiaco/14062023/14062024');

      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal('Specified Dates Not Found');
  });
});