const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Product extends Model {}
Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    width: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    depth: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    material: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true,
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    type:{
      type:DataTypes.STRING,
      allowNull:false
    },
    style:{
      type:DataTypes.STRING,
      allowNull:false
    },
    availability: {
      type: DataTypes.VIRTUAL,
      get: function (inventory) {
        if (inventory > 0) {
          return true;
        } else {
          return false;
        }
      },
    },
  },
  { sequelize: db, modelName: 'product' }
);

module.exports = Product;
