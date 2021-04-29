const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class OrderProduct extends Model {}
OrderProduct.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  },
  { sequelize: db, modelName: 'orderProducts' }
);

module.exports = OrderProduct;
