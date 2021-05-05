const {
  models: { User, Cart },
} = require('../db/index');

const requireUserToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.verifyByToken(token); // tries to find token/user on header
    req.user = user; // if user exists, add to request
    next(); // prevents an infinite loop and allows request to move onto the next function
  } catch (error) {
    next(error);
  }
};

const requireCartToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const cart = await Cart.verifyByToken(token);
    req.cart = cart;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { requireUserToken, requireCartToken };
