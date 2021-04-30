const { expect } = require('chai');
const {
  models: { Room },
} = require('../../server/db');
const { ValidationError } = require('sequelize');
describe('Room Model', () => {
  let newRoom;
  beforeEach(async () => {
    // Create and save an example room before each test.
    newRoom = new Room({
      name: 'living',
    });

    await newRoom.save();
  });
  afterEach(async () => {
    await newRoom.destroy();
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
});
