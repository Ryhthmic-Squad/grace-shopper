const {
  models: { User },
} = require('../db/index');
const router = require('express').Router();
const {
  requireCartToken,
  requireAdminToken,
  requireUserToken,
} = require('./Utils');

// GET /api/users/all returns all users if given a valid Admin token
router.get('/all', requireAdminToken, async (req, res, next) => {
  try {
    res.send(await User.findAll({ attributes: { exclude: ['password'] } }));
  } catch (er) {
    next(er);
  }
});

// DELETE /api/users/:id deletes a user if given a valid Admin token
router.delete('/:id', requireAdminToken, async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await User.findByPk(id);
    await user.destroy();
    res.sendStatus(204);
  } catch (er) {
    next(er);
  }
});

// GET /api/users returns the current user details with a valid User token
router.get('/', requireUserToken, async (req, res, next) => {
  const { user } = req;
  try {
    // console.log('----->GET/ api/users', user);
    res.send(user);
  } catch (er) {
    next(er);
  }
});

// PUT /api/users updates the current user details with a valid User token
router.put('/', requireUserToken, async (req, res, next) => {
  try {
    let { user } = req;
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    user.email = email || user.email;
    user.password = password || user.password;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    await user.save();
    user = await User.findByPk(user.id, {
      attributes: { exclude: ['password'] },
    });
    res.send(user);
  } catch (er) {
    next(er);
  }
});

// POST /api/users creates a new user with the details provided
router.post('/', requireCartToken, async (req, res, next) => {
  try {
    const { cart } = req;
    const { email, firstName, lastName, phoneNumber, password } = req.body;
    const newUserDetails = {
      email,
      firstName,
      lastName,
      phoneNumber,
      password,
    };
    console.log(1);
    console.log(email, firstName, lastName, phoneNumber, password);
    let user = await User.create(newUserDetails);
    console.log(2);
    await user.setCart(cart);
    console.log(3);
    if (password && password !== 'guest') {
      await user.update({ password });
    }
    user = await User.findByPk(user.id, {
      attributes: { exclude: ['password'] },
    });
    res.send(user);
  } catch (er) {
    next(er);
  }
});

module.exports = router;
