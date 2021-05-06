const {
  models: { User, Cart },
} = require('../db/index');
const router = require('express').Router();
const {
  requireCartToken,
  requireAdminToken,
  requireUserToken,
} = require('./Utils');

// GET /api/users/all
router.get('/all', requireAdminToken, async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (er) {
    next(er);
  }
});

// GET /api/users
router.get('/', requireUserToken, async (req, res, next) => {
  const { user } = req;
  try {
    console.log('----->GET/ api/users', user);
    res.send(user);
  } catch (er) {
    next(er);
  }
});

// GET /api/users/:id/cart
// retrieves a cart's associated products from database
router.get('/:id/cart', requireCartToken, async (req, res, next) => {
  const { cart } = req;
  console.log('requireCartToken', cart);
  try {
    res.send(cart);
  } catch (er) {
    next(er);
  }
});

// PUT /api/users/:id
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).send(await user.update(req.body));
  } catch (er) {
    next(er);
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  } catch (er) {
    next(er);
  }
});

// POST /api/users
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (er) {
    next(er);
  }
});

module.exports = router;
