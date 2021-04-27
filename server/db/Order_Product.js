const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Order_Products extends Model {}
Order_Products.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  { sequelize: db, modelName: 'orders_products' }
);

module.exports = Order_Products;
