const { test } = require('@jest/globals');
const {
  models: { User, Order, Product },
} = require('../../server/db');

let newOrder;
beforeAll(async () => {
  newOrder = new Order();
  await newOrder.save();
});
afterAll(async () => {
  await newOrder.destroy();
});
test('Orders have a status that defaults to "CREATED"', async () => {
  expect(newOrder.status).toBe('CREATED');
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
  test('Orders can be linked to a User', async () => {
    try {
      await newUser.addOrder(newOrder);
    } catch (err) {
      console.error(err);
      expect(true).toBe(false);
    }
    const { length } = await newUser.getOrders();
    expect(length).toBe(1);
  });
  test('A user can have multiple linked orders', async () => {
    try {
      const orders = Array(3)
        .fill('')
        .map(() => new Order());
      const userOrders = await Promise.all(orders.map((order) => order.save()));
      await newUser.addOrders(userOrders);
    } catch (err) {
      console.error(err);
      expect(true).toBe(false);
    }
    const { length } = await newUser.getOrders();
    expect(length).toBe(3);
  });
});
describe('Order and Product associations', () => {
  let products;
  beforeEach(async () => {
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
        price: 1,
        description: 'product 1',
        type: 'bed',
        style: 'contemporary',
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
        price: 2,
        description: 'product 2',
        type: 'bed',
        style: 'contemporary',
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
        price: 3,
        description: 'product 3',
        type: 'bed',
        style: 'contemporary',
      },
    ].map((prod) => new Product(prod));
    await Promise.all(products.map((prod) => prod.save()));
  });
  afterEach(async () => {
    await Promise.all(products.map((prod) => prod.destroy()));
  });
  test('Orders can have Products', async () => {
    try {
      await newOrder.addProduct(products[0], {
        through: { quantity: 1, price: products[0].price },
      });
    } catch (err) {
      console.error(err);
      expect(true).toBe(false);
    }
    const { length } = await newOrder.getProducts();
    expect(length).toBe(1);
  });
  test('Orders note the quantity of each Product', async () => {
    try {
      await newOrder.addProduct(products[0], {
        through: { quantity: 7, price: products[0].price },
      });
    } catch (err) {
      console.error(err);
      expect(true).toBe(false);
    }
    //grab the first element from the array returned by newOrder.getProducts(),
    //then destructure the quantity from the orderProducts association
    const [
      {
        orderProducts: { quantity },
      },
    ] = await newOrder.getProducts();
    expect(quantity).toBe(7);
  });
});
