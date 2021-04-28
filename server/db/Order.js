const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Order extends Model {}
Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM(['CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED']),
      defaultValue: 'CREATED',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { sequelize: db, modelName: 'orders' }
);

module.exports = Order;
