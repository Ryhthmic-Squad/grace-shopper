const db = require('./db');
//Import all models here
//e.g. const Product = require('./Product');
const User = require('./User');
const Product = require('./Product');
const Address = require('./Address');
const Order = require('./Order');
const OrderProduct = require('./OrderProduct');

//Set up relations for models here
//e.g. Product.belongsTo(Room);

// Users can have many orders associated with their account
User.hasMany(Order);
Order.belongsTo(User);

// Users can have many addresses associated with their account
User.hasMany(Address);
Address.belongsTo(User);

// OrderProduct is a connection table that connects a product to an order and keeps a quantity:
Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

//export the database connection and models from this file
module.exports = {
  db,
  models: { User, Product, Address, Order, OrderProduct },
};
