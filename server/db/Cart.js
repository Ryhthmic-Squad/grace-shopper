const { DataTypes, Model } = require('sequelize');
const jwt = require('jsonwebtoken');
const db = require('./db');
const Product = require('./Product');
const CartProduct = require('./CartProduct');

class Cart extends Model {}
Cart.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  // for long-term use delete if there isn't an associated user or was created at a certain time period
  { sequelize: db, modelName: 'carts' }
);

// Finds the Cart and associated products, ordered by name
Cart.getWithProducts = async (cartId) => {
  try {
    const cart = Cart.findByPk(cartId, {
      include: {
        model: CartProduct,
        include: Product,
        separate: true,
        order: [[Product, 'name', 'ASC']],
      },
    });
    return cart;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Verifies if the user id from header request matches with the req.params
Cart.verifyByToken = async (token) => {
  try {
    const { cartId } = jwt.verify(token, process.env.JWT);
    const cart = await Cart.getWithProducts(cartId);
    if (cart) {
      return cart;
    }
    const error = Error('unauthorized access');
    error.status = 401;
    throw error;
  } catch (ex) {
    console.error(ex);
    const error = Error('unauthorized access');
    error.status = 401;
    throw error;
  }
};

module.exports = Cart;
