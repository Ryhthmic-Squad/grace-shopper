const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { DataTypes, Model } = require('sequelize');
const db = require('./db');
const Cart = require('./Cart');

// allow null email & password?
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
      allowNull: true,
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
User.authentication = async function ({ email, password, visitor }) {
  if (visitor) {
    const cart = await Cart.create();
    const guestToken = jwt.sign({ cartId: cart.id }, process.env.JWT);
    return guestToken;
  }
  console.log('-----> 1 User.authentication');
  const user = await User.findOne({
    where: { email },
    include: Cart,
  });
  console.log('-----> User found? ', user);
  if (user) {
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (passwordCheck) {
      //get cart id via sequelize since user properties does not include cartId
      const { cart } = user;
      console.log('-----> 2 User.authentication', cart);
      // let token;
      // if (cart) {
      //   token = jwt.sign(
      //     { userId: user.id, cartId: user.cart.id },
      //     process.env.JWT
      //   );
      // } else {
      // }
      const token = jwt.sign(
        { userId: user.id, cartId: cart.id },
        process.env.JWT
      );
      return token;
    } else {
      const error = Error('bad credentials');
      error.status = 401;
      throw error;
    }
  } else {
  }
};

// Verifies user
User.verifyByToken = async function (token) {
  try {
    const { userId } = jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(userId);
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

// Verifies user
User.verifyByTokenIfAdmin = async function (token) {
  try {
    const { userId } = jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(userId);
    if (user.isAdmin) {
      return user;
    }
    const error = Error('unauthorized for admin privileges');
    error.status = 401;
    throw error;
  } catch (ex) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

User.afterCreate(async (user) => {
  const cart = await Cart.create();
  await user.setCart(cart);
  console.log(cart.userId === user.id);
});

module.exports = User;
