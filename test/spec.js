const { expect } = require('chai');
const { ValidationError } = require('sequelize');
const {
  db,
  models: { User, Product },
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
    it('has a fullName attirbute that combines first and last names', () => {
      expect(newUser.fullName).to.equal('Jane Doe');
    });
    it('the fullName attribute is virtuall and not a column in the database', () => {
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

describe('Product Model', () => {
  let newProduct;
  beforeEach(async () => {
    // Create and save an example user before each test.
    newProduct = new Product({
      name: 'testSofa',
      inventory: 1,
      dimensions: { width: 1, length: 2, hieght: 3 },
      material: 'cotton',
      color: 'gray',
      price: 100.0,
      description: 'An awesome test sofa',
      availability: true,
    });
    await newProduct.save();
  });
  afterEach(async () => {
    // Delete the example user after each test to avoid unique constraint errors.
    await newProduct.destroy();
  });
  describe('Attribute: name', () => {
    it('has a name', () => {
      expect(newProduct.name).to.be.ok;
    });
    it('name cannot be empty', async () => {
      newProduct.name = '';
      try {
        await newProduct.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    it('name cannot be null', async () => {
      newUser.email = null;
      try {
        await newProduct.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });

    it('ensures names are unique', async () => {
      //create another user with the same email
      anotherProduct = new Product({
        name: 'testSofa',
        inventory: 3,
        dimensions: { width: 2, length: 2, hieght: 1 },
        material: 'polyester',
        color: 'green',
        price: 150.0,
        description: 'A second awesome test sofa',
        availability: true,
      });
      try {
        //attempt to save that second product with the same name
        await anotherProduct.save();
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
    it('has a fullName attirbute that combines first and last names', () => {
      expect(newUser.fullName).to.equal('Jane Doe');
    });
    it('the fullName attribute is virtuall and not a column in the database', () => {
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
