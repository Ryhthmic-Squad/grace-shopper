const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const stripe = require('stripe')(
  'sk_test_51InzHlFBTivT4al2MJRUcHa2MkZhq0EijAg3UWMK6RRLwGgfXyald98EmiG9zy6FYhSH1dF5QSpYDHAh41arM9ra00ZtMATlKa'
);
//Body parsing middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

// Static Files

app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Routes for products and users
app.use('/api/reviews', require('./api/Reviews'));
app.use('/api/products', require('./api/Products'));
app.use('/api/orders', require('./api/Orders'));
app.use('/api/users', require('./api/Users'));
app.use('/api/auth', require('./api/Auth'));
app.use('/create-checkout-session', require('./api/Stripe'));
app.use('/api/carts', require('./api/Carts'));

// Error hander

app.use((er, req, res, next) => {
  console.error(er.stack);
  res.status(er.status || 500).send({ error: er.message });
});

module.exports = app;
