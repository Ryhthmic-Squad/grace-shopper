const express = require('express');
const app = express();
const morgan = require('morgan');

//Body parsing middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

// Routes for products and users

app.use('/api/products', require('./api/Products'));
app.use('/api/users', require('./api/Users'));

// Error hander

app.use((er, req, res, next) => {
  console.error(er.stack);
  res.status(500).send({ error: er });
});

module.exports = app;
