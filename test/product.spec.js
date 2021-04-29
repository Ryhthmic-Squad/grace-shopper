const { expect } = require('chai');
const { ValidationError } = require('sequelize');
const {
  db,
  models: { Product },
} = require('../server/db');
// db.options.logging = true;


describe('Product Model', () => {
  let newProduct;
  beforeEach( async() => {
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
    });
    await newProduct.save();
  });
  afterEach(async () => {
    // Delete the example user after each test to avoid unique constraint errors.
    await newProduct.destroy();
  });
  describe('Attribute: name', () => {
    it('has a name attribute', () => {
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
      newProduct.name = null;
      try {
        await newProduct.save();
        //above should throw an error, so below should not run
        expect(true).to.equal(false);
      } catch (err) {
        expect(err instanceof ValidationError).to.equal(true);
      }
    });
    describe('Attribute: inventory', () => {
        it('has inventory', () => {
          expect(newProduct.inventory).to.be.ok;
        });
        it('inventory cannot be empty', async () => {
          newProduct.inventory = '';
          try {
            await newProduct.save();
            //above should throw an error, so below should not run
            expect(true).to.equal(false);
          } catch (err) {
            expect(err instanceof ValidationError).to.equal(true);
          }
        });

    describe('Attribute: imageUrl', () => {
        it('has a name attribute', () => {
          expect(newProduct.imageUrl).to.be.ok;
        });
        it('only allows valid imageUrls', async () => {
            newProduct.imageUrl = 'a fake website';
            try {
              await newProduct.save();
              //above should throw an error, so below should not run
              expect(true).to.equal(false);
            } catch (err) {
              expect(err instanceof ValidationError).to.equal(true);  
        }
    });

    describe('Attribute: description', () => {
        it('has a name attribute', () => {
          expect(newProduct.description).to.be.ok;
        });
        it('description cannot be empty', async () => {
        newProduct.description = '';
        try {
          await newProduct.save();
          //above should throw an error, so below should not run
          expect(true).to.equal(false);
        } catch (err) {
          expect(err instanceof ValidationError).to.equal(true);
        }
      }) })

    describe('Attribute: dimensions', () => {
        it('has height, width, and optional depth', () => {
          expect(newProduct.height).to.be.ok;
          expect(newProduct.width).to.be.ok;
          expect(newProduct.depth).to.be.ok;
        });
        describe('Attribute: description', () => {
            it('has a name attribute', () => {
              expect(newProduct.description).to.be.ok;
            });
    
        it('description cannot be empty', async () => {
            newProduct.description = '';
            try {
              await newProduct.save();
              //above should throw an error, so below should not run
              expect(true).to.equal(false);
            } catch (err) {
              expect(err instanceof ValidationError).to.equal(true);
            }
          })
        }) 