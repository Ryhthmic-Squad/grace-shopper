const { expect } = require('chai');
const {
  models: { User, Cart, Product },
} = require('../../server/db');

describe('Cart Model', () => {
  let newCart;
  beforeEach(async () => {
    newCart = new Cart();
    await newCart.save();
  });
  afterEach(async () => {
    await newCart.destroy();
  });
  describe('Cart and User associations', () => {
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
    it('Carts can be linked to a User', async () => {
      try {
        await newUser.setCart(newCart);
      } catch (err) {
        console.error(err);
        expect(true).to.equal(false);
      }
      const cart = await newUser.getCart();
      expect(cart instanceof Cart).to.be.true;
    });
  });
  describe('Carts and Product associations', () => {
    let products;
    before(async () => {
      products = [
        {
          name: 'prod1',
          inventory: 1,
          dimensions: '1x1x1',
          material: 'felt',
          color: 'red',
          imageUrl: 'test.png',
          price: 1.11,
          description: 'product 1',
        },
        {
          name: 'prod2',
          inventory: 2,
          dimensions: '2x2x2',
          material: 'felt',
          color: 'red',
          imageUrl: 'test.png',
          price: 2.22,
          description: 'product 2',
        },
        {
          name: 'prod3',
          inventory: 3,
          dimensions: '3x3x3',
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
      // await Promise.all(products.map((prod) => prod.destroy()));
    });
    it('Carts can have Products', async () => {
      try {
        await newCart.addProduct(products[0], { through: { quantity: 1 } });
      } catch (err) {
        console.error(err);
        expect(true).to.equal(false);
      }
      const cartProducts = await newCart.getProducts();
      expect(cartProducts).to.have.length(1);
    });
    it('Carts note the quantity of each Product', async () => {
      try {
        await newCart.addProduct(products[0], { through: { quantity: 7 } });
      } catch (err) {
        console.error(err);
        expect(true).to.equal(false);
      }
      const { cartProducts } = (await newCart.getProducts())[0];
      expect(cartProducts.quantity).to.equal(7);
    });
  });
});