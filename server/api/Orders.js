const {
  models: { Order },
} = require('../db/index');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.send(orders);
  } catch (er) {
    next(er);
  }
});

module.exports = router;
