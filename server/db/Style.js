const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Style extends Model {}
Style.init({
  type: {
    type: DataTypes.STRING,
  },
  allowNull: false,
  validate: {
    notEmpty: true,
  },
});

module.exports = Style;
