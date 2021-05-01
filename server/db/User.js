const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

// encrypts password
User.addHook('beforeSave', async function (user) {
  if (user._changed.has('password')) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

// generates token for user & adds signature on the backend
User.authentication = async function ({ email, password }) {
  // console.log('-----> User.authentication, CREDENTIALS', email, password);
  const user = await User.findOne({ where: { email } });
  // console.log('-----> User.authentication, USER', user);
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id }, process.env.JWT);
    // console.log('-----> User.authentication: token', token);
    return token;
  }
  const error = Error('bad credentials');
  error.status = 401;
  throw error;
};

// Verifies user
User.verifyByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    // check if user exists
    if (user) {
      return user;
    }
    // if user does not exist, send this error message
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  } catch (ex) {
    // if a token that is not sized correctly this sends the correct error message
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

module.exports = User;
