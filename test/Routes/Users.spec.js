const { expect } = require('chai');
const {
  db,
  models: { User },
} = require('../../server/db/index');
const app = require('supertest')(require('../../server/app.js'));

describe('Routes', () => {
  describe('GET /api/users', () => {
    it('returns all users in the database', async () => {
      const users = await User.findAll();
      const response = await app.get('/api/users');
      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(users.length);
    });
  });
  describe('GET /api/users/:id', () => {
    it('returns the requested user', async () => {
      const { id, fullName } = await User.findOne({
        where: { firstName: 'Princess' },
      });
      const response = await app.get(`/api/users/${id}`);
      expect(response.status).to.equal(201);
      expect(response.body.fullName).to.equal(fullName);
    });
  });
});
