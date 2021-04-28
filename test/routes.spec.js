const { expect } = require('chai');
const { syncAndSeed } = require('../server/db/seed');
const app = require('supertest')(require('../server/index'));

describe('Routes', () => {
  let seed;
  beforeEach(async () => {
    seed = await syncAndSeed();
  });
  describe('GET /api/users', () => {
    it('returns 4 users', async () => {
      const response = await app.get('/api/users');
      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(4);
    });
  });
});
