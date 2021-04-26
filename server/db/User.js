const { DataTypes, Model } = require('sequelize');

const db = require('./db');

class User extends Model {}
User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      //build in hashing at some point, likely beforeUpdate hook?
      validate: {
        notEmpty: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        isBool(value) {
          if (value === true || value === false) {
            // console.log('valid isAdmin');
          } else {
            throw new Error('Only boolean values are allowed');
          }
        },
      },
    },
  },
  { sequelize: db, modelName: 'user' }
);

class Product extends Model {}
Product.init({
  name: {
    type: DataTypes.STRING,
  },
  inventory: {
    type: DataTypes.INTEGER,
  },
  dimensions: {
    type: DataTypes.TEXT,
  },
  material: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  description: {
    type: DataTypes.TEXT,
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
});

module.exports = {
  models: {
    User,
    Product,
  },
};
