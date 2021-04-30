const { test } = require('@jest/globals');
const { ValidationError } = require('sequelize');
const {
  models: { User, Address },
} = require('../../server/db');
// db.options.logging = true;

beforeEach(async () => {
  // Create and save an example address before each test
  newAddress = new Address({
    line1: '5 Hanover Square',
    line2: 'Floor 11',
    city: 'New York',
    state: 'NY',
    zip: '10004',
  });
  await newAddress.save();
});
afterEach(async () => {
  // Delete the example address after each test to avoid unique constraint errors.
  await newAddress.destroy();
});
describe('Attributes', () => {
  describe('Attribute: line1', () => {
    test('has a line1 attribute', () => {
      expect(newAddress.line1).toBeTruthy();
    });
    test('line1 cannot be empty', async () => {
      newAddress.line1 = '';
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).toBe(false);
      } catch (err) {
        expect(err instanceof ValidationError).toBe(true);
      }
    });
    test('line1 cannot be null', async () => {
      newAddress.line1 = null;
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).toBe(false);
      } catch (err) {
        expect(err instanceof ValidationError).toBe(true);
      }
    });
  });
  describe('Attribute: line2', () => {
    test('has a line2 attribute', () => {
      expect(newAddress.line2).toBeTruthy();
    });
    test('line2 can be null', async () => {
      delete newAddress.line2;
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).toBe(true);
      } catch (err) {
        console.error(err);
        expect(true).toBe(false);
      }
    });
  });
  describe('Attribute: city', () => {
    test('has a city attribute', () => {
      expect(newAddress.city).toBeTruthy();
    });
    test('city cannot be empty', async () => {
      newAddress.city = '';
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).toBe(false);
      } catch (err) {
        expect(err instanceof ValidationError).toBe(true);
      }
    });
    test('city cannot be null', async () => {
      newAddress.city = null;
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).toBe(false);
      } catch (err) {
        expect(err instanceof ValidationError).toBe(true);
      }
    });
  });
  describe('Attribute: state', () => {
    test('has a state attribute', () => {
      expect(newAddress.state).toBeTruthy();
    });
    test('state cannot be empty', async () => {
      newAddress.state = '';
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).toBe(false);
      } catch (err) {
        expect(err instanceof ValidationError).toBe(true);
      }
    });
    test('state cannot be null', async () => {
      newAddress.state = null;
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).toBe(false);
      } catch (err) {
        expect(err instanceof ValidationError).toBe(true);
      }
    });
    test('only accepts state abbreviations from server/db/states.js', async () => {
      newAddress.state = 'ST';
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).toBe(false);
      } catch (err) {
        expect(err instanceof ValidationError).toBe(true);
      }
    });
  });
  describe('Attribute: zip', () => {
    test('has a zip attribute', () => {
      expect(newAddress.zip).toBeTruthy();
    });
    test('zip cannot be empty', async () => {
      newAddress.zip = '';
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).toBe(false);
      } catch (err) {
        expect(err instanceof ValidationError).toBe(true);
      }
    });
    test('zip cannot be null', async () => {
      newAddress.zip = null;
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).toBe(false);
      } catch (err) {
        expect(err instanceof ValidationError).toBe(true);
      }
    });
    test('zip must be at least 5 characters', async () => {
      newAddress.zip = '1234';
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).toBe(false);
      } catch (err) {
        expect(err instanceof ValidationError).toBe(true);
      }
    });
    test('zip must be at most 5 characters', async () => {
      newAddress.zip = '123456';
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).toBe(false);
      } catch (err) {
        expect(err instanceof ValidationError).toBe(true);
      }
    });
    test('zip should only contain digits', async () => {
      newAddress.zip = 'abcde';
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).toBe(false);
      } catch (err) {
        expect(err instanceof ValidationError).toBe(true);
      }
    });
  });
  describe('Attribute: fullAddress', () => {
    test('has a fullAddress attribute that combines first and last names', () => {
      expect(newAddress.fullAddress).toBe(
        '5 Hanover Square Floor 11\nNew York, NY 10004'
      );
    });
    test('the fullAddress attribute is virtual and not a column in the database', () => {
      expect(newAddress.hasOwnProperty('fullAddress')).toBe(false);
    });
  });
});
describe('Address and User associations', () => {
  let newUser, newAddress;
  beforeAll(async () => {
    // Create and save example addresses before each test.
    newAddress1 = new Address({
      line1: '5 Hanover Square',
      line2: 'Floor 11',
      city: 'New York',
      state: 'NY',
      zip: '10004',
    });
    await newAddress1.save();
    newAddress2 = new Address({
      line1: '5 Hanover Square',
      line2: 'Floor 13',
      city: 'New York',
      state: 'NY',
      zip: '10004',
    });
    await newAddress2.save();
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
  afterAll(async () => {
    // Delete the example user & addresses after each test to avoid unique constraint errors.
    await newUser.destroy();
    await newAddress1.destroy();
    await newAddress2.destroy();
  });

  test('Addresses can be linked to a User', async () => {
    try {
      await newUser.addAddress(newAddress1);
    } catch (err) {
      console.error(err);
      expect(true).toBe(false);
    }
    expect((await newUser.getAddresses()).length).toBe(1);
  });
  test('A user can have multiple addresses linked', async () => {
    try {
      await newUser.addAddresses(newAddress2);
    } catch (err) {
      console.error(err);
      expect(true).to.equal(false);
    }
    expect((await newUser.getAddresses()).length).toBe(2);
  });
});
