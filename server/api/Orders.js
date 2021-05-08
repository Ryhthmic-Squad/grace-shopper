const {
  models: { Order },
} = require('../db/index');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
    res.send(orders);
  } catch (er) {
    next(er);
  }
});
router.put('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.send(orders);
  } catch (er) {
    next(er);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.send(orders);
  } catch (er) {
    next(er);
  }
});
module.exports = router;
