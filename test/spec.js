const { expect } = require('chai');
const { ValidationError } = require('sequelize');
const {
  db,
  models: { User },
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
    newUser = new User({
      email: 'test@email.com',
      password: '1234',
      phoneNumber: '1234567890',
      firstName: 'Jane',
      lastName: 'Doe',
    });
    await newUser.save();
  });
  afterEach(() => {
    newUser.destroy();
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
  });
  describe('Attribute: password', () => {
    it('has a password attribute', () => {
      expect(newUser.password).to.equal('1234');
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
      expect(newUser.phoneNumber).to.equal('1234567890');
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
      expect(newUser.firstName).to.equal('Jane');
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
      expect(newUser.lastName).to.equal('Doe');
    });
    it('lastName cannot be empty', async () => {
      newUser.email = '';
      try {
        await newUser.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    it('lastName cannot be null', async () => {
      newUser.email = null;
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
    it('has a fullName virtual attirbute that combines first and last names', () => {
      expect(newUser.fullName).to.equal('Jane Doe');
    });
    it('the fullName attribute is not a column in the database', () => {
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
