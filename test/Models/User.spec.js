const { test } = require('@jest/globals');
const { ValidationError } = require('sequelize');
const {
  models: { User },
} = require('../../server/db');
// db.options.logging = true;

let newUser;
beforeEach(async () => {
  // Create and save an example user before each test.
  newUser = new User({
    email: 'test@email.com',
    password: '1234',
    phoneNumber: '1234567890',
    firstName: 'Jane',
    lastName: 'Doe',
  });
  await newUser.save();
});
afterEach(async () => {
  // Delete the example user after each test to avoid unique constraint errors.
  await newUser.destroy();
});
describe('Attribute: email', () => {
  test('has an email attribute', () => {
    expect(newUser.email).toBeTruthy();
  });
  test('email cannot be empty', async () => {
    newUser.email = '';
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
  test('email cannot be null', async () => {
    newUser.email = null;
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
  test('only allows valid emails', async () => {
    newUser.email = 'not an email';
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
  test('ensures emails are unique', async () => {
    //create another user with the same email
    anotherUser = new User({
      email: 'test@email.com',
      password: '1234',
      phoneNumber: '1234567890',
      firstName: 'John',
      lastName: 'Doe',
    });
    try {
      //attempt to save that second user with the same email
      await anotherUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
});
describe('Attribute: password', () => {
  test('has a password attribute', () => {
    expect(newUser.password).toBeTruthy();
  });
  test('password cannot be empty', async () => {
    newUser.password = '';
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
  test('password can be null', async () => {
    newUser.password = null;
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(true);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(false);
    }
  });
});
describe('Attribute: phoneNumber', () => {
  test('has a phoneNumber attribute', () => {
    expect(newUser.phoneNumber).toBeTruthy();
  });
  test('phoneNumber cannot be empty', async () => {
    newUser.phoneNumber = '';
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
  test('phoneNumber cannot be null', async () => {
    newUser.phoneNumber = null;
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
});
describe('Attribute: firstName', () => {
  test('has a firstName attribute', () => {
    expect(newUser.firstName).toBeTruthy();
  });
  test('firstName cannot be empty', async () => {
    newUser.firstName = '';
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
  test('firstName cannot be null', async () => {
    newUser.firstName = null;
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
});
describe('Attribute: lastName', () => {
  test('has a lastName attribute', () => {
    expect(newUser.lastName).toBeTruthy();
  });
  test('lastName cannot be empty', async () => {
    newUser.lastName = '';
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
  test('lastName cannot be null', async () => {
    newUser.lastName = null;
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
});
describe('Attribute: fullName', () => {
  test('has a fullName attribute that combines first and last names', () => {
    expect(newUser.fullName).toBe('Jane Doe');
  });
  test('the fullName attribute is virtual and not a column in the database', () => {
    expect(newUser.hasOwnProperty('fullName')).toBe(false);
  });
});
describe('Attribute: isAdmin', () => {
  test('has an isAdmin property that defaults to false', () => {
    expect(newUser.isAdmin).toBe(false);
  });
  test('the isAdmin property can be changed to true', async () => {
    newUser.isAdmin = true;
    try {
      await newUser.save();
      expect(true).toBe(true);
    } catch (err) {
      expect(false).toBe(true);
    }
  });
  test('the isAdmin property cannot be changed to something other than true or false', async () => {
    newUser.isAdmin = 'null';
    try {
      await newUser.save();
      expect(false).toBe(true);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
});
