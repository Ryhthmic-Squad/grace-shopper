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
  it('has an email attribute', () => {
    expect(newUser.email).toBeTruthy();
  });
  it('email cannot be empty', async () => {
    newUser.email = '';
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
  it('email cannot be null', async () => {
    newUser.email = null;
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
  it('only allows valid emails', async () => {
    newUser.email = 'not an email';
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
  it('ensures emails are unique', async () => {
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
  it('has a password attribute', () => {
    expect(newUser.password).toBeTruthy();
  });
  it('password cannot be empty', async () => {
    newUser.password = '';
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
  it('password cannot be null', async () => {
    newUser.password = null;
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
});
describe('Attribute: phoneNumber', () => {
  it('has a phoneNumber attribute', () => {
    expect(newUser.phoneNumber).toBeTruthy();
  });
  it('phoneNumber cannot be empty', async () => {
    newUser.phoneNumber = '';
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
  it('phoneNumber cannot be null', async () => {
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
  it('has a firstName attribute', () => {
    expect(newUser.firstName).toBeTruthy();
  });
  it('firstName cannot be empty', async () => {
    newUser.firstName = '';
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
  it('firstName cannot be null', async () => {
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
  it('has a lastName attribute', () => {
    expect(newUser.lastName).toBeTruthy();
  });
  it('lastName cannot be empty', async () => {
    newUser.lastName = '';
    try {
      await newUser.save();
      //above should throw an error, so below should not run
      expect(true).toBe(false);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
  it('lastName cannot be null', async () => {
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
  it('has a fullName attribute that combines first and last names', () => {
    expect(newUser.fullName).toBe('Jane Doe');
  });
  it('the fullName attribute is virtual and not a column in the database', () => {
    expect(newUser.hasOwnProperty('fullName')).toBe(false);
  });
});
describe('Attribute: isAdmin', () => {
  it('has an isAdmin property that defaults to false', () => {
    expect(newUser.isAdmin).toBe(false);
  });
  it('the isAdmin property can be changed to true', async () => {
    newUser.isAdmin = true;
    try {
      await newUser.save();
      expect(true).toBe(true);
    } catch (err) {
      expect(false).toBe(true);
    }
  });
  it('the isAdmin property cannot be changed to something other than true or false', async () => {
    newUser.isAdmin = 'null';
    try {
      await newUser.save();
      expect(false).toBe(true);
    } catch (err) {
      expect(err instanceof ValidationError).toBe(true);
    }
  });
});
