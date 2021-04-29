const { expect } = require('chai');
const {
  models: { Product, Room },
} = require('../../server/db');

describe('Room Model', () => {
  let newRoom;
  let testProd;
  beforeEach(async () => {
    // Create and save an example room before each test.
    newRoom = new Room({
      name: 'testRoom',
    });
    newProduct = new Product({
      name: 'test product 2',
      inventory: 10,
      height: 10.0,
      width: 20.1,
      depth: null,
      style: 'testStyle',
      material: 'wood',
      color: 'pink',
      imageUrl: 'image.com',
      price: 1000.25,
      description:
        'This is a long detailed description of the product you are currently looking at.',
    });
    await newRoom.save();
    await newProduct.save();
  });
  afterEach(async () => {
    await newRoom.destroy();
    await newProduct.destroy();
  });
});
describe('Attribute: Room Name', () => {
  it('has a name', () => {
    expect(newRoom.name).to.be.ok;
  });
  it('name cannot be empty', async () => {
    newRoom.name = '';
    try {
      await newRoom.save();
      //above should throw an error, so below should not run
      expect(true).to.equal(false);
    } catch (err) {
      expect(err instanceof ValidationError).to.equal(true);
    }
  });
  it('name cannot be null', async () => {
    newRoom.name = null;
    try {
      await newRoom.save();
      //above should throw an error, so below should not run
      expect(true).to.equal(false);
    } catch (err) {
      expect(err instanceof ValidationError).to.equal(true);
    }
  });
});
