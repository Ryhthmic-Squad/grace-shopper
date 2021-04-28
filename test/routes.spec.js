const { expect } = require('chai');
//const { syncAndSeed } = require('../server/db/seed');
const {
  db,
  models: { User },
} = require('../server/db/index');
const app = require('supertest')(require('../server/index'));

describe('Routes', () => {
  // let seed;
  // beforeEach(async () => {
  //   seed = await syncAndSeed();
  // });
  beforeEach(async () => {
    try {
      await db.sync({ force: true });
      await Promise.all([
        User.create({
          email: 'johnSmith@gmail.com',
          password: '1234',
          phoneNumber: '123-456-7890',
          firstName: 'John',
          lastName: 'Smith',
          isAdmin: true,
        }),
      ]);
    } catch (er) {
      console.error(er);
    }
  });

  describe('GET /api/users', () => {
    it('returns 1 user', async () => {
      const response = await app.get('/api/users');
      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(1);
    });
  });
  // describe('GET /api/users/:id', () => {
  //   it('returns user', async () => {
  //     const response = await app.get('/api/users');
  //     expect(response.status).to.equal(200);
  //     expect(response.body.length).to.equal(4);
  //   });
  // });
});
