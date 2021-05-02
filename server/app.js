const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');

//Body parsing middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

// Static Files

app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Routes for products and users

app.use('/api/products', require('./api/Products'));
app.use('/api/orders', require('./api/Orders'));
app.use('/api/users', require('./api/Users'));
app.use('/api/auth', require('./api/Auth'));

// Error hander

app.use((er, req, res, next) => {
  console.error(er.stack);
  res.status(er.status || 500).send({ error: er.message });
});

module.exports = app;
