//we may want to move this, along with Products.js into an API subfolder
const {
  models: { User },
} = require('./db/index');
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
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (err) {
    next(err);
  }
});

// POST/api/users
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
