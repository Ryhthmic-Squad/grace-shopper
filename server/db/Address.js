const { DataTypes, Model } = require('sequelize');
const db = require('./db');
const states = require('./states');

class Address extends Model {}
Address.init(
  {
    line1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    line2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    state: {
      type: DataTypes.ENUM(states),
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [states],
      },
    },
    zip: {
      type: DataTypes.STRING(5),
      allowNull: false,
      validate: {
        len: [5, 5],
        isDecimal: true,
      },
    },
    isBilling: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isMailing: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    fullAddress: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return `${this.line1} ${this.line2}\n${this.city}, ${this.state} ${this.zip}`;
      },
    },
  },
  { sequelize: db, modelName: 'addresses' }
);

module.exports = Address;
