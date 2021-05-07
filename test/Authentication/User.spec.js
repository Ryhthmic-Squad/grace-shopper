const { test } = require('@jest/globals');
const jwt = require('jsonwebtoken');
const {
  models: { User, Cart },
} = require('../../server/db/index');

let userLogin;
beforeEach(async () => {
  // Create and save an example user before each test.
  userLogin = await User.create({
    email: 'test@email.com',
    password: '1234',
    phoneNumber: '1234567890',
    firstName: 'Jane',
    lastName: 'Doe',
  });
});
afterEach(async () => {
  // Delete the example user after each test to avoid unique constraint errors.
  await userLogin.destroy();
});
describe('User Update', () => {
  describe('change name', () => {
    test('does not change the password', async () => {
      const password = userLogin.password;
      const admin = userLogin;
      admin.firstName = 'Janelle';
      await admin.save();
      expect(admin.password).toBe(password);
    });
  });
});
describe('Class Method: User.authentication', () => {
  describe('correct credentials', () => {
    test('returns a token', async () => {
      const token = await User.authentication({
        email: 'test@email.com',
        password: '1234',
      });
      expect(token).toBeTruthy();
      // console.log(token);
    });
  });
  describe('incorrect credentials', () => {
    test('throws an error', async () => {
      try {
        await User.authentication({
          email: 'test@email.com',
          password: '4321',
        });
        throw 'incorrect credentials!';
      } catch (er) {
        expect(er.status).toBe(401);
        expect(er.message).toBe('bad credentials');
      }
    });
  });
});
describe('Class Method: User.verifyByToken', () => {
  describe('with a valid token', () => {
    test('returns a user', async () => {
      const {
        id: userId,
        cart: { id: cartId },
      } = await User.findByPk(userLogin.id, { include: Cart });
      const token = await jwt.sign({ userId, cartId }, process.env.JWT);
      const user = await User.verifyByToken(token);
      expect(user.fullName).toBe(userLogin.fullName);
    });
  });
  // error will be thrown if someone uses an invalid token
  describe('with a invalid token', () => {
    test('throws a 401', async () => {
      try {
        const token = await jwt.sign({ id: userLogin.id }, 'randomToken');

        await User.verifyByToken(token);
        throw 'invalid token';
      } catch (er) {
        expect(er.status).toBe(401);
        expect(er.message).toBe('bad credentials');
      }
    });
  });
  describe('with a valid token but no associated user', () => {
    test('throws a 401', async () => {
      try {
        const token = await jwt.sign({ id: 99 }, process.env.JWT);
        await User.verifyByToken(token);
        throw 'no associated user';
      } catch (er) {
        expect(er.status).toBe(401);
        expect(er.message).toBe('bad credentials');
      }
    });
  });
});
