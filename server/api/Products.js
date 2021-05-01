const {
  models: { Product },
} = require('../db/index');
const router = require('express').Router();

// Select all products

router.get('/all', async (req, res, next) => {
  try {
    allProducts = await Product.findAll();
    res.status(200).send(allProducts);
  } catch (err) {
    next(err);
  }
});

// get with queries to paginate and filter

router.get('/', async (req, res, next) => {
  const { page, size, type, style, room, sort } = req.query;
  const options = {
    attributes: {
      include: [
        'id',
        'name',
        'material',
        'color',
        'imageUrl',
        'price',
        'type',
        'style',
        'availability',
      ],
    },
    order: ['name'],
    where: {},
  };
  if (page && size) {
    options.offset = (page - 1) * size;
    options.limit = size;
  }
  if (type) {
    options.where.type = type;
  }
  if (style) {
    options.where.style = style;
  }
  try {
    const { count, rows } = await Product.findAndCountAll(options);
    res.status(200).send({ total: count, products: rows });
  } catch (er) {
    next(er);
  }
});

// Products by type

router.get('/Bytype/:type', async (req, res, next) => {
  try {
    const type = await Product.findAll({
      where: {
        type: req.params.type,
      },
    });
    res.status(200).send(type);
  } catch (er) {
    next(er);
  }
});

router.get('/Bystyle/:style', async (req, res, next) => {
  try {
    const type = await Product.findAll({
      style: req.params.style,
    });
    res.status(200).send(type);
  } catch (er) {
    next(er);
  }
});

//Products by room and style

router.get('/Byroom/:room', async (req, res, next) => {
  try {
    const room = await Product.findAll({
      where: {
        room: req.params.room,
      },
    });
    res.status(200).send(room);
  } catch (er) {
    next(er);
  }
});
router.get('/Byroom/:room/:style', async (req, res, next) => {
  try {
    const room = await Product.findAll({
      where: {
        room: req.params.room,
        style: req.params.style,
      },
    });
    res.status(200).send(room);
  } catch (er) {
    next(er);
  }
});

// Single product

router.get('/Byid/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.status(200).send(product);
  } catch (er) {
    next(er);
  }
});

module.exports = router;
