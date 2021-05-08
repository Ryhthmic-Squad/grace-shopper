const {
  models: { Product, Room },
} = require('../db/index');
const router = require('express').Router();

// Select all products
router.post('/all', async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (err) {
    next(err);
  }
});

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
  const { page, size, sort, type, style, room } = req.query;
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
    order: [['name', 'DESC']],
    where: {},
  };
  if (page && size) {
    options.offset = (page - 1) * size;
    options.limit = size;
  }
  if (sort) {
    const [by, dir] = sort.split(',');
    options.order = [[by, dir]];
  }
  if (type) {
    options.where.type = type;
  }
  if (style) {
    options.where.style = style;
  }
  if (room) {
    const { id } = await Room.findOne({ where: { name: room } });
    options.where.roomId = id;
  }
  try {
    const { count, rows } = await Product.findAndCountAll(options);
    res.status(200).send({ maxPage: Math.ceil(count / size), products: rows });
    // sends back an object like { maxPage: INT, products: [products...] }
  } catch (er) {
    next(er);
  }
});

// GET /api/products/rooms
router.get('/rooms', async (req, res, next) => {
  try {
    const rooms = await Room.findAll({ attributes: { include: ['name'] } });
    res.send(rooms);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/styles
router.get('/styles', async (req, res, next) => {
  try {
    const styles = await Product.sequelize.query(
      'SELECT DISTINCT style FROM products;',
      { raw: true }
    );
    res.send(styles[0]);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/types
router.get('/types', async (req, res, next) => {
  try {
    const types = await Product.sequelize.query(
      'SELECT DISTINCT type FROM products;',
      { raw: true }
    );
    res.send(types[0]);
  } catch (err) {
    next(err);
  }
});

// Single product

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.status(200).send(product);
  } catch (er) {
    next(er);
  }
});

module.exports = router;
