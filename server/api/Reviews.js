const {
  models: { Review },
} = require('../db/index');
const router = require('express').Router();

router.get('/:id', async (req, res, next) => {
  try {
    await Review.findAll({
      where: {
        userId: req.params.id,
      },
    });
  } catch (er) {
    next(er);
  }
});

module.exports = router;
