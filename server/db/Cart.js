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
  // for long-term use delete if there isn't an associated user or was created at a certain time period
  { sequelize: db, modelName: 'carts' }
);

// Verifies if the user id from header request matches with the req.params
Cart.verifyByToken = async (user, reqId) => {
  try {
    const { cartId } = jwt.verify(token, process.env.JWT);
    const cart = await Cart.findByPk(cartId);
    console.log('------> Cart.verifyByToken', cartId);
    if (cart) {
      return cart;
    }
    // if (user.id == reqId) {
    //   const cart = await Cart.findOne({ where: { userId: user.id } });
    //   let cartProducts = [];
    //   if (cart) {
    //     cartProducts = await cart.getProducts();
    //   }
    //   return cartProducts;
    // }
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
