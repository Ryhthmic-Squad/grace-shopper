const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Style extends Model {}
Style.init({
  type: {
    type: DataTypes.ENUM('contemporary', 'modern', 'transitional'),
  },
  allowNull: false,
  validate: {
    notEmpty: true,
  },
});

module.exports = Style;
