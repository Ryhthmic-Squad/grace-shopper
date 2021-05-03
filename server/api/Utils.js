const {
  models: { User },
} = require('../db/index');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization; // checks if there is a header
    const user = await User.verifyByToken(token); // tries to find token/user on header
    req.user = user; // if user exists, add to request
    next(); // prevents an infinite loop and allows request to move onto the next function
  } catch (error) {
    next(error);
  }
};

module.exports = { requireToken };
