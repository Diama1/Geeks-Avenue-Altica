import chai from 'chai';
import hashHelper from '../helpers/Hash.helper';
import validation from '../helpers/Validations.helper';

const { expect } = chai;
const password = 'YESyes123!@#';
const hash = hashHelper.hashPassword(password);

describe('testing the hash password helpers', () => {
    
    it('should hash the password', (done) => {
       expect(hashHelper.hashPassword(password)).to.be.a('string');
       done();
    });

    it('should compare the password', (done) => {
       expect(hashHelper.comparePassword(password, hash)).to.be.true;
       done();
    })
});

describe('testing the validation helpers', () => {
    it('should validate the comment', (done) => {
       const descript = {
           description: 'haaa... this is a good one.',
         }
        const val = validation.commentArticle(descript);
        expect(val).to.be.an('object');
        expect(val.error).to.equal(null);
        expect(val.value.description).to.equal(descript.description);
        done();
    });

    it('should validate the content before updating the article', (done) => {
        const update = {
            title: 'javascript',
            description: 'haaa... this is a good one.',
            category: 'Tech',
          }
         const updateVal = validation.updateArticle(update);
         expect(updateVal).to.be.an('object');
         expect(updateVal.error).to.equal(null);
         expect(updateVal.value.description).to.equal(update.description);
         expect(updateVal.value.title).to.equal(update.title);
         expect(updateVal.value.category).to.equal(update.category);
         done();
     });

     it('should validate the article', (done) => {
        const article = {
            title: 'javascript',
            description: 'haaa... this is a good one.',
            category: 'Tech',
          }
         const articleVal = validation.articleValidate(article);
         expect(articleVal).to.be.an('object');
         expect(articleVal.error).to.equal(null);
         expect(articleVal.value.description).to.equal(article.description);
         expect(articleVal.value.title).to.equal(article.title);
         expect(articleVal.value.category).to.equals(article.category);
         done();
     });

     it('should validate login user input', (done) => {
        const descript = {
            email: 'ITbrune77@gmail.com',
            password: 'ITBrune!@#123',
          }
         const loginVal = validation.loginValidate(descript);
         expect(loginVal).to.be.an('object');
         expect(loginVal.error).to.equal(null);
         expect(loginVal.value.email).to.equal(descript.email);
         expect(loginVal.value.password).to.equal(descript.password);
         done();
     });

     it('should validate the user input on registration', (done) => {
        const user = {
            fullNames: 'Itetere Brune',
            email: 'ITbrune77@gmail.com',
            password: 'ITBrune!@#123',
          }
         const userVal = validation.userValidate(user);
         expect(userVal).to.be.an('object');
         expect(userVal.error).to.equal(null);
         expect(userVal.value.fullNames).to.equal(user.fullNames);
         expect(userVal.value.email).to.equal(user.email);
         expect(userVal.value.password).to.equal(user.password);
         done();
     });
});