const { test } = require('@jest/globals');
const {
  models: { Product },
} = require('../../server/db/index');
const app = require('../../server/app');
const agent = require('supertest')(app);

describe('GET /api/products', () => {
  test('returns all products in the database', async () => {
    const products = await Product.findAll();
    const response = await agent.get('/api/products').expect(200);
    expect(response.body.length).toBe(products.length);
  });
});
describe('GET /api/products/:Bytype', () => {
  test('returns all products of a given type', async () => {
    const dressers = await Product.findAll({ where: { type: 'dresser' } });
    console.log(dressers)
    const response = await agent.get('/api/products/Bytype/dresser').expect(200);
    console.log(response.body)
    expect(response.body.length).toBe(dressers.length);
  });
});
describe('GET /api/products/Byid/:id', () => {
  test('returns a specific product', async () => {
    const dresser = await Product.findOne({ where: { type: 'dresser' } });
    const response = await agent
      .get(`/api/products/Byid/${dresser.id}`)
      .expect(200);
    expect(response.body.name).toBe(dresser.name);
  });
});
