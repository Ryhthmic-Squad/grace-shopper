const { expect } = require('chai');
const {
  models: { User },
} = require('../../server/db/index');
const app = require('supertest')(require('../../server/app.js'));

describe('Routes', () => {
  let user1, user2;
  beforeEach(async function () {
    try {
      [user1, user2] = await Promise.all([
        User.create({
          email: 'johnSmith@gmail.com',
          password: 'john_pw',
          phoneNumber: '123-456-7890',
          firstName: 'John',
          lastName: 'Smith',
          isAdmin: true,
        }),
        User.create({
          email: 'michelleBranch@gmail.com',
          password: 'michelle_pw',
          phoneNumber: '911-456-7890',
          firstName: 'Michelle',
          lastName: 'Branch',
          isAdmin: true,
        }),
      ]);
    } catch (er) {
      console.error(er);
    }
  });

  afterEach(async () => {
    try {
      await Promise.all([user1.destroy(), user2.destroy()]);
    } catch (err) {
      console.error(err);
    }
  });

  describe('GET /api/users', () => {
    it('returns 2 users', async () => {
      const response = await app.get('/api/users');
      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(2);
    });
  });
  describe('GET /api/users/:id', () => {
    it('returns the requested user', async () => {
      const { id, fullName } = user1;
      const response = await app.get(`/api/users/${id}`);
      expect(response.status).to.equal(201);
      expect(response.body.fullName).to.equal(fullName);
    });
  });
});
