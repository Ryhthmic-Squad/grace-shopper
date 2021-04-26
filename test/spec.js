const { expect } = require('chai');
const { ValidationError } = require('sequelize');
const {
  db,
  models: { User, Address },
} = require('../server/db');
// db.options.logging = true;

describe('Initial Test', () => {
  it('adds 1 and 1 to make 2', () => {
    expect(1 + 1).to.equal(2);
  });
});

describe('User Model', () => {
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
      expect(newUser.email).to.be.ok;
    });
    it('email cannot be empty', async () => {
      newUser.email = '';
      try {
        await newUser.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    it('email cannot be null', async () => {
      newUser.email = null;
      try {
        await newUser.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    it('only allows valid emails', async () => {
      newUser.email = 'not an email';
      try {
        await newUser.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
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
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
  });
  describe('Attribute: password', () => {
    it('has a password attribute', () => {
      expect(newUser.password).to.be.ok;
    });
    it('password cannot be empty', async () => {
      newUser.password = '';
      try {
        await newUser.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    it('password cannot be null', async () => {
      newUser.password = null;
      try {
        await newUser.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
  });
  describe('Attribute: phoneNumber', () => {
    it('has a phoneNumber attribute', () => {
      expect(newUser.phoneNumber).be.ok;
    });
    it('phoneNumber cannot be empty', async () => {
      newUser.phoneNumber = '';
      try {
        await newUser.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    it('phoneNumber cannot be null', async () => {
      newUser.phoneNumber = null;
      try {
        await newUser.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
  });
  describe('Attribute: firstName', () => {
    it('has a firstName attribute', () => {
      expect(newUser.firstName).to.be.ok;
    });
    it('firstName cannot be empty', async () => {
      newUser.firstName = '';
      try {
        await newUser.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    it('firstName cannot be null', async () => {
      newUser.firstName = null;
      try {
        await newUser.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
  });
  describe('Attribute: lastName', () => {
    it('has a lastName attribute', () => {
      expect(newUser.lastName).to.be.ok;
    });
    it('lastName cannot be empty', async () => {
      newUser.lastName = '';
      try {
        await newUser.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    it('lastName cannot be null', async () => {
      newUser.lastName = null;
      try {
        await newUser.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
  });
  describe('Attribute: fullName', () => {
    it('has a fullName attribute that combines first and last names', () => {
      expect(newUser.fullName).to.equal('Jane Doe');
    });
    it('the fullName attribute is virtual and not a column in the database', () => {
      expect(newUser.hasOwnProperty('fullName')).to.equal(false);
    });
  });
  describe('Attribute: isAdmin', () => {
    it('has an isAdmin property that defaults to false', () => {
      expect(newUser.isAdmin).to.equal(false);
    });
    it('the isAdmin property can be changed to true', async () => {
      newUser.isAdmin = true;
      try {
        await newUser.save();
        expect(true).to.equal(true);
      } catch (err) {
        expect(false).to.equal(true);
      }
    });
    it('the isAdmin property cannot be changed to something other than true or false', async () => {
      newUser.isAdmin = 'null';
      try {
        await newUser.save();
        expect(false).to.equal(true);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
  });
});

describe('Address Model', () => {
  let newAddress;
  beforeEach(async () => {
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
    await newAddress.destroy();
  });
  describe('Attribute: line1', () => {
    it('has a line1 attribute', () => {
      expect(newAddress.line1).to.be.ok;
    });
    it('line1 cannot be empty', async () => {
      newAddress.line1 = '';
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    it('line1 cannot be null', async () => {
      newAddress.line1 = null;
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
  });
  describe('Attribute: line2', () => {
    it('has a line2 attribute', () => {
      expect(newAddress.line2).to.be.ok;
    });
    it('line2 can be null', async () => {
      delete newAddress.line2;
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(true);
      } catch (err) {
        console.error(err);
        expect(true).to.equal(false);
      }
    });
  });
  describe('Attribute: city', () => {
    it('has a city attribute', () => {
      expect(newAddress.city).to.be.ok;
    });
    it('city cannot be empty', async () => {
      newAddress.city = '';
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    it('city cannot be null', async () => {
      newAddress.city = null;
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
  });
  describe('Attribute: state', () => {
    it('has a state attribute', () => {
      expect(newAddress.state).to.be.ok;
    });
    it('state cannot be empty', async () => {
      newAddress.state = '';
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    it('state cannot be null', async () => {
      newAddress.state = null;
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    it('only accepts state abbreviations from server/db/states.js', async () => {
      newAddress.state = 'ST';
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
  });
  describe('Attribute: zip', () => {
    it('has a zip attribute', () => {
      expect(newAddress.zip).to.be.ok;
    });
    it('zip cannot be empty', async () => {
      newAddress.zip = '';
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    it('zip cannot be null', async () => {
      newAddress.zip = null;
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    it('zip must be at least 5 characters', async () => {
      newAddress.zip = '1234';
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    it('zip must be at most 5 characters', async () => {
      newAddress.zip = '123456';
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    it('zip should only contain digits', async () => {
      newAddress.zip = 'abcde';
      try {
        await newAddress.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
  });
  describe('Attribute: fullAddress', () => {
    it('has a fullAddress attribute that combines first and last names', () => {
      expect(newAddress.fullAddress).to.equal(
        '5 Hanover Square Floor 11\nNew York, NY 10004'
      );
    });
    it('the fullAddress attribute is virtual and not a column in the database', () => {
      expect(newAddress.hasOwnProperty('fullAddress')).to.equal(false);
    });
  });
});
