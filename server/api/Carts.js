const CartProduct = require('../db/CartProduct');
const {
  models: { User, Cart, Product },
} = require('../db/index');
const router = require('express').Router();
const {
  requireCartToken,
  requireAdminToken,
  requireUserToken,
} = require('./Utils');

// GET /api/carts
router.get('/', requireCartToken, async (req, res, next) => {
  const { cart } = req;
  try {
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

// PUT /api/carts
router.put('/', requireCartToken, async (req, res, next) => {
  let { cart } = req;
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findOne({ where: { id: productId } });
    // let cartProduct = await CartProduct.findOne({
    //   where: { cartId: cart.id, productId },
    // });
    // console.log('current quantity: ', cartProduct.quantity);
    // console.log('desired quantity: ', quantity);
    await cart.removeProduct(product);
    if (quantity) {
      await cart.addProduct(product, { through: { quantity } });
    }
    // cartProduct = await CartProduct.findOne({
    //   where: { cartId: cart.id, productId },
    // });
    // console.log('new quantity: ', cartProduct.quantity);
    cart = await Cart.findByPk(cart.id, { include: Product });
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
