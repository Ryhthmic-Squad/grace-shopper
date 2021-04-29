const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');

//Body parsing middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

// Routes for products and users

app.use('/api/products', require('./Products'));
app.use('/api/users', require('./Users'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// Error hander

app.use((er, req, res, next) => {
  console.error(er.stack);
  res.status(500).send({ error: er });
});

module.exports = app;
