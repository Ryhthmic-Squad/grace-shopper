const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Furniture extends Model {}
Furniture.init({
  type: {
    type: DataTypes.STRING,
  },
  allowNull: false,
  validate: {
    notEmpty: true,
  },
});

module.exports = Furniture;
