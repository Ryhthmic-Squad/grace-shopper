const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Cart extends Model {}
Cart.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { sequelize: db, modelName: 'carts' }
);

// Verifies if the user id from header request matches with the req.params
Cart.verifyByToken = async (user, reqId) => {
  try {
    if (user.id === +reqId) {
      const cart = Cart.findOne({ where: { userId: user.id } });
      // Q: how do we know if we will get the right quantity of each product - use cartProducts table?
      const cartItems = await cart.getProducts();
      return cartItems;
    }
    const error = Error('unauthorized access');
    error.status = 401;
    throw error;
  } catch (ex) {
    const error = Error('unauthorized access');
    error.status = 401;
    throw error;
  }
};

module.exports = Cart;
