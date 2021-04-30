const { test } = require('@jest/globals');
const {
  models: { User },
} = require('../../server/db/index');
const app = require('supertest')(require('../../server/app.js'));

describe('GET /api/users', () => {
  test('returns all users in the database', async () => {
    const users = await User.findAll();
    const response = await app.get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(users.length);
  });
});
describe('GET /api/users/:id', () => {
  test('returns the requested user', async () => {
    const { id, fullName } = await User.findOne({
      where: { firstName: 'Princess' },
    });
    const response = await app.get(`/api/users/${id}`);
    expect(response.status).toBe(201);
    expect(response.body.fullName).toBe(fullName);
  });
});
