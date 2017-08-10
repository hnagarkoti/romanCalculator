//During the test the env variable is set to test
process.env.NODE_ENV    = 'test';


//Require the dev-dependencies
let chai                = require('chai');
let chaiHttp            = require('chai-http');
let server              = require('../app');
let should              = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Calculate API', () => {
  /*
    * Test the /POST route for calculate api
  */
  describe('/POST calculate', () => {
      it('it should return output as L', (done) => {
        let input = {
          	"val1": "XL",
          	"val2": "X",
          	"method": "+"
          }
        chai.request(server)
            .post('/calculate')
            .send(input)
            .end((err, res) => {
              res.body.code.should.be.equal(200);
              res.body.data.should.be.equal('L');
              done();
            });
      });
  });

});
