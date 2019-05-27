// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../app';
// import userController from '../controllers/userControllers';
// import db from '../models';

// const { User } = db;

// const { expect } = chai;
// chai.use(chaiHttp);

// describe('create a user to the database', () => {
//   it('check for user existance', (done) => {
//     const req = {
//         fullNames: 'Itetere Brune',
//         email: 'ITbrune7@gmail.com',
//         password: 'ITBrune!@#123',
//     }

//     const checkUser = User.findAll({
//         where: {
//             email: req.email,
//         }
//     });

//     if(checkUser.length > 0) {
//         expect(res.body).to.have.status(400);
//     }
//     done();
//   });
// });