const db = require('./db');
//Import all models here
//e.g. const Product = require('./Product');
const User = require('./User');
const Order = require('./Order');
const Order_Product = require('./Order_Product');

//Set up relations for models here
//e.g. Product.belongsTo(Room);
User.hasMany(Order);
Order.belongsTo(User);
//uncomment once Product is built out:
// Order.hasMany(Product);
// Product.belongsToMany(Order);

//export the database connection and models from this file
module.exports = { db, models: { User, Order, Order_Product } };
