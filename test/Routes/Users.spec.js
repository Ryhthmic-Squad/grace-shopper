const { test, beforeEach, expect } = require('@jest/globals');
const jwt = require('jsonwebtoken');
const {
  models: { User, Cart },
} = require('../../server/db/index');
const app = require('supertest')(require('../../server/app.js'));

let token, cartToken;

beforeAll(async () => {
  const {
    id: userId,
    cart: { id: cartId },
  } = await User.findOne({
    where: { firstName: 'Princess' },
    include: Cart,
  });
  token = jwt.sign({ userId, cartId }, process.env.JWT);
});
describe('GET /api/users/all', () => {
  test('returns all users in the database with an admin token', async () => {
    const users = await User.findAll();
    const response = await app
      .get('/api/users/all')
      .set('authorization', token);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(users.length);
  });
  test('does not return user passwords, even hashed', async () => {
    const response = await app
      .get('/api/users/all')
      .set('authorization', token);
    expect(response.body[0].password).toBeUndefined();
  });
});
describe('GET /api/users', () => {
  test('returns the requested user with a valid token', async () => {
    const { fullName } = await User.findOne({
      where: { firstName: 'Princess' },
    });
    const response = await app.get(`/api/users`).set('authorization', token);
    expect(response.status).toBe(200);
    expect(response.body.fullName).toBe(fullName);
  });
  test('does not return the password, even hashed', async () => {
    const { fullName } = await User.findOne({
      where: { firstName: 'Princess' },
    });
    const response = await app.get(`/api/users`).set('authorization', token);
    expect(response.status).toBe(200);
    expect(response.body.fullName).toBe(fullName);
    expect(response.body.password).toBeUndefined();
  });
});
describe('PUT /api/users', () => {
  test('updates the requested user attributes with a valid token', async () => {
    const { fullName } = await User.findOne({
      where: { firstName: 'Princess' },
    });
    const response = await app
      .put('/api/users')
      .send({ phoneNumber: '5555555555' })
      .set('authorization', token);
    expect(response.status).toBe(200);
    expect(response.body.fullName).toBe(fullName);
    expect(response.body.phoneNumber).toBe('5555555555');
  });
});
describe('POST /api/users', () => {
  test('creates a user with an email, first and last names, and phone number', async () => {
    await User.destroy({ where: { email: 'test@gmail.com' } });
    const newCart = await Cart.create();
    const cartToken = jwt.sign({ cartId: newCart.id }, process.env.JWT);
    const newUser = {
      email: 'test@gmail.com',
      firstName: 'Test',
      lastName: 'Name',
      phoneNumber: '1234567890',
    };
    const response = await app
      .post('/api/users')
      .send(newUser)
      .set('authorization', cartToken);
    expect(response.status).toBe(200);
    expect(response.body.fullName).toBe('Test Name');
    expect(response.body.password).toBeUndefined();
  });
  test('creates a new user with an optional password', async () => {
    await User.destroy({ where: { email: 'test@gmail.com' } });
    const newCart = await Cart.create();
    const cartToken = jwt.sign({ cartId: newCart.id }, process.env.JWT);
    const newUser = {
      email: 'test@gmail.com',
      password: 'password',
      firstName: 'Test',
      lastName: 'Name',
      phoneNumber: '1234567890',
    };
    const response = await app
      .post('/api/users')
      .send(newUser)
      .set('authorization', cartToken);
    expect(response.status).toBe(200);
    expect(response.body.fullName).toBe('Test Name');
    expect(response.body.password).toBeUndefined();
  });
});
describe('DELETE /api/users/:id', () => {
  test('deletes a user from the database when given a valid Admin token', async () => {
    const { id } = await User.create({
      email: 'test2@gmail.com',
      firstName: 'Another',
      lastName: 'Test',
      phoneNumber: '1234567890',
    });
    expect((await User.findByPk(id)).fullName).toBe('Another Test');
    const response = await app
      .delete(`/api/users/${id}`)
      .set('authorization', token);
    expect(response.status).toBe(204);
    expect(await User.findByPk(id)).toBeNull;
  });
});
