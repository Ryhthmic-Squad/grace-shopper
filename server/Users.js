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

module.exports = router;
