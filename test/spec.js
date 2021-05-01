const { describe } = require('@jest/globals');
const { db } = require('../server/db');

describe('Grace Shopper Tests', () => {
  beforeAll(async () => {
    // Be sure to npm run seed before testing, as some tests rely on seeded data
    // Do not { force: true } otherwise it overwrites the seed
    await db.sync();
  });
  afterAll(async () => {
    await db.close();
  });
  xdescribe('Authentication Tests', () => {
    describe('User Authentication', () => {
      require('./Authentication/User.spec');
    });
    describe('User Authentication Routes', () => {
      require('./Authentication/UserRoutes.spec');
    });
  });
  describe('Model Tests', () => {
    describe('Address Model', () => {
      require('./Models/Address.spec');
    });
    describe('Cart Model', () => {
      require('./Models/Cart.spec');
    });
    describe('Order Model', () => {
      require('./Models/Order.spec');
    });
    describe('Review Model', () => {
      require('./Models/Review.spec');
    });
    describe('User Model', () => {
      require('./Models/User.spec');
    });
  });
  describe('Route Tests', () => {
    describe('/api/products', () => {
      require('./Routes/Products.spec');
    });
    describe('/api/users', () => {
      require('./Routes/Users.spec');
    });
  });
});
