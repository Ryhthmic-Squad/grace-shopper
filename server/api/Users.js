const {
  models: { User },
} = require('../db/index');
const router = require('express').Router();

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
    const user = await User.findByPk(req.params.campusId);
    await user.destroy();
    res.sendStatus(204);
  } catch (er) {
    next(er);
  }
});

// POST/api/users
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (er) {
    next(er);
  }
});

// GET /api/users/:id/orders

module.exports = router;
