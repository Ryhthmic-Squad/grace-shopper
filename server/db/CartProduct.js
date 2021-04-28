const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class CartProduct extends Model {}
CartProduct.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  },
  { sequelize: db, modelName: 'carts' }
);

module.exports = CartProduct;
