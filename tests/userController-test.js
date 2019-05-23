import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import userController from '../controllers/userControllers';

const { expect } = chai;
chai.use(chaiHttp);

describe('create a user to the database', () => {
  it('check for user existance', (done) => {
    chai
    .request(app)
    .post('/api/v1/auth/signup')
    .send({
        email: 'elieMugenzi@gmail.com',
    })
    .end((err, res) => {
        expect(res.body).to.have.status(200);
        done();
    });
    
  });
});