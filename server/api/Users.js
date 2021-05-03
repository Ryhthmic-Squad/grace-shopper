const {
  models: { User, Cart },
} = require('../db/index');
const router = require('express').Router();
const { requireToken } = require('./Utils');
// add require by token middleware

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (er) {
    next(er);
  }
});

// GET /api/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    res.status(201).send(await User.findByPk(req.params.id));
  } catch (er) {
    next(er);
  }
});

// GET /api/users/:id/cart
router.get('/:id/cart', requireToken, async (req, res, next) => {
  try {
    res.send(await Cart.byToken(req.user, req.params.id));
  } catch (er) {
    next(er);
  }
});

// PUT /api/users/:id - Not needed for requirements

// DELETE /api/users/:id - Not needed for requirements
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     await user.destroy();
//     res.sendStatus(204);
//   } catch (er) {
//     next(er);
//   }
// });

// POST /api/users
// Create a new user from login
// If there's time if new user gets saved with hashed password
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (er) {
    next(er);
  }
});

module.exports = router;
