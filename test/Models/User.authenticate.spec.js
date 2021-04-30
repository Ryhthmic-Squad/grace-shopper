const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const {
  db,
  models: { User },
} = require('../../server/db/index');

/*
describe('Models', () => {
  describe('User.authenticate', () => {
    describe('correct credentials', () => {
      xit('returns a token', async () => {
        const token = await User.authenticate({
          email: 'johnSmith@gmail.com',
          password: 'john_pw',
        });
        expect(token).to.be.ok;
        console.log(token);
      });
    });
  });
  describe('incorrect credentials', () => {
    xit('throws an error', async () => {
      try {
        await User.authenticate({
          email: 'johnSmith@gmail.com',
          password: 'jo_schmo',
        });
        throw 'NOPE!';
      } catch (ex) {
        expect(ex.status).to.equal(401);
        expect(ex.message).to.equal('bad credentials');
      }
    });
  });
  describe('User.byToken', () => {
    //before each await user
    describe('with a valid token', () => {
      xit('returns a user', async () => {
        const userLogin = await User.findOne({
          where: { email: 'johnSmith@gmail.com' },
        });
        //console.log('----->', userLogin);
        const token = await jwt.sign({ id: userLogin.id }, process.env.JWT);
        const user = await User.byToken(token);
        expect(user.fullName).to.equal('John Smith');
      });
    });
  });
});
*/
