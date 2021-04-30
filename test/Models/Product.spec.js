const { test } = require('@jest/globals');
const { ValidationError } = require('sequelize');
const {
  models: { Product },
} = require('../../server/db');
// db.options.logging = true;

describe('Product Model', () => {
  let newProduct;
  beforeEach(async () => {
    // Create and save an example product before each test.
    newProduct = new Product({
      name: 'test product',
      inventory: 10,
      height: 10.0,
      width: 20.1,
      depth: null,
      material: 'wood',
      color: 'pink',
      imageUrl: 'image.com',
      price: 1000.25,
      description:
        'This is a long detailed description of the product you are currently looking at.',
      type: 'typetest',
      style: 'testStyle',
    });
    await newProduct.save();
  });
  afterEach(async () => {
    await newProduct.destroy();
  });

  describe('Attribute: name', () => {
    test('has a name', () => {
      expect(newProduct.name).to.be.ok;
    });
    test('name cannot be empty', async () => {
      newProduct.name = '';
      try {
        await newProduct.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    test('name cannot be null', async () => {
      newProduct.name = null;
      try {
        await newProduct.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
  });

  describe('Attribute: inventory', () => {
    test('has inventory', () => {
      expect(newProduct.inventory).to.be.ok;
    });
    test('inventory cannot be empty', async () => {
      newProduct.inventory = '';
      try {
        await newProduct.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
  });

  describe('Attribute: imageUrl', () => {
    test('has a name attribute', () => {
      expect(newProduct.imageUrl).to.be.ok;
    });
    test('only allows valid imageUrls', async () => {
      newProduct.imageUrl = 'a fake website';
      try {
        await newProduct.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
  });

  describe('Attribute: description', () => {
    test('has a description attribute', () => {
      expect(newProduct.description).to.be.ok;
    });
    test('description cannot be empty', async () => {
      newProduct.description = '';
      try {
        await newProduct.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
  });

  describe('Attribute: dimensions', () => {
    test('has height, width, and optional depth', () => {
      expect(newProduct.height).to.be.ok;
      expect(newProduct.width).to.be.ok;
      expect(newProduct.depth).to.be.null;
    });
  });

  describe('Attribute: description', () => {
    test('has a name attribute', () => {
      expect(newProduct.description).to.be.ok;
    });
    test('description cannot be empty', async () => {
      newProduct.description = '';
      try {
        await newProduct.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
  });
  describe('Attribute: style', () => {
    test('has a style', () => {
      expect(newProduct.style).to.be.ok;
    });
  });
  describe('Attribute: type', () => {
    test('has a type', () => {
      expect(newProduct.type).to.be.ok;
    });
  });
});
