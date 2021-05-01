const { test } = require('@jest/globals');
const {
  models: { User },
} = require('../../server/db/index');
const app = require('../../server/app');
const agent = require('supertest')(app);

let newUser;
beforeEach(async () => {
  // Create and save an example user before each test.
  newUser = new User({
    email: 'authTest@email.com',
    password: '1234',
    phoneNumber: '1234567890',
    firstName: 'John',
    lastName: 'Deer',
  });
  await newUser.save();
});
afterEach(async () => {
  // Delete the example user after each test to avoid unique constraint errors.
  await newUser.destroy();
});

describe('POST /api/auth', () => {
  test('with valid credentials it returns a token', async () => {
    const response = await agent
      .post('/api/auth')
      .send({ email: 'authTest@email.com', password: '1234' });
    //console.log('-----> TEST SPEC', response.body);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });
  test('with invalid credentials it throws an error', async () => {
    const response = await agent
      .post('/api/auth')
      .send({ email: 'authTest@email.com', password: 'randomPW' });
    //console.log('-----> TEST SPEC', response.body);
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('bad credentials');
  });
});

// still need to add a couple of tests
