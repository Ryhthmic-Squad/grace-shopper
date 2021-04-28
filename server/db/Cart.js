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

module.exports = Cart;
