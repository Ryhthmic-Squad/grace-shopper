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
    await cart.removeProduct(product);
    if (quantity) {
      await cart.addProduct(product, { through: { quantity } });
    }
    cart = await Cart.getWithProducts(cart.id);
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

// PUT /api/carts/clear - remove products
router.put('/clear', requireCartToken, async (req, res, next) => {
  try {
    let { cart } = req;
    await cart.setProducts([]);
    cart = await Cart.getWithProducts(cart.id);
    res.send(cart);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
