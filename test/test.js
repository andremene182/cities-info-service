const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

//Assertion
chai.should();

chai.use(chaiHttp);

describe('Test Start', () => {

  describe('GET /v1/cities-info', () => {
    const cities = 'padova,milano,bologna';
    it('Return Cities Info', (done) => {
      chai
        .request(app)
        .get('/v1/cities-info?cities='+cities)
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have
          //
          done();
        })
    })
  })



})