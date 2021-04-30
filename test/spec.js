const { db } = require('../server/db');

describe('Grace Shopper Tests', () => {
  beforeAll(async () => {
    await db.sync();
  });
  afterAll(async () => {
    await db.close();
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
