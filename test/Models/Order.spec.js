const { expect } = require('chai');
const {
  models: { User, Order, Product },
} = require('../../server/db');

describe('Order Model', () => {
  let newOrder;
  beforeEach(async () => {
    newOrder = new Order();
    await newOrder.save();
  });
  afterEach(async () => {
    await newOrder.destroy();
  });
  it('Orders have a status that defaults to "CREATED"', async () => {
    expect(newOrder.status).to.equal('CREATED');
  });
  describe('Order and User associations', () => {
    let newUser;
    beforeEach(async () => {
      newUser = new User({
        email: 'test@email.com',
        password: '1234',
        phoneNumber: '1234567890',
        firstName: 'Jane',
        lastName: 'Doe',
      });
      await newUser.save();
    });
    afterEach(async () => {
      newUser.destroy();
    });
    it('Orders can be linked to a User', async () => {
      try {
        await newUser.addOrder(newOrder);
      } catch (err) {
        console.error(err);
        expect(true).to.equal(false);
      }
      expect(await newUser.getOrders()).to.have.length(1);
    });
    it('A user can have multiple linked orders', async () => {
      try {
        const orders = Array(3)
          .fill('')
          .map(() => new Order());
        const userOrders = await Promise.all(
          orders.map((order) => order.save())
        );
        await newUser.addOrders(userOrders);
      } catch (err) {
        console.error(err);
        expect(true).to.equal(false);
      }
      expect(await newUser.getOrders()).to.have.length(3);
    });
  });
  describe('Order and Product associations', () => {
    let products;
    before(async () => {
      products = [
        {
          name: 'prod1',
          inventory: 1,
          width: 1,
          depth: 1,
          height: 1,
          material: 'felt',
          color: 'red',
          imageUrl: 'test.png',
          price: 1.11,
          description: 'product 1',
        },
        {
          name: 'prod2',
          inventory: 2,
          width: 2,
          depth: 2,
          height: 2,
          material: 'felt',
          color: 'red',
          imageUrl: 'test.png',
          price: 2.22,
          description: 'product 2',
        },
        {
          name: 'prod3',
          inventory: 3,
          width: 3,
          depth: 3,
          height: 3,
          material: 'felt',
          color: 'red',
          imageUrl: 'test.png',
          price: 3.33,
          description: 'product 3',
        },
      ].map((prod) => new Product(prod));
      await Promise.all(products.map((prod) => prod.save()));
    });
    after(async () => {
      await Promise.all(products.map((prod) => prod.destroy()));
    });
    it('Orders can have Products', async () => {
      try {
        await newOrder.addProduct(products[0], { through: { quantity: 1 } });
      } catch (err) {
        console.error(err);
        expect(true).to.equal(false);
      }
      const orderProducts = await newOrder.getProducts();
      expect(orderProducts).to.have.length(1);
    });
    it('Orders note the quantity of each Product', async () => {
      try {
        await newOrder.addProduct(products[0], { through: { quantity: 7 } });
      } catch (err) {
        console.error(err);
        expect(true).to.equal(false);
      }
      const { orderProducts } = (await newOrder.getProducts())[0];
      expect(orderProducts.quantity).to.equal(7);
    });
  });
});
