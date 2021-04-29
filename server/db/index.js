const db = require('./db');
//Import all models here
//e.g. const Product = require('./Product');
const User = require('./User');
const Product = require('./Product');
const Room = require('./Room');
const Address = require('./Address');
const Order = require('./Order');
const OrderProduct = require('./OrderProduct');
const Cart = require('./Cart');
const CartProduct = require('./CartProduct');

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

//Users can only have a single cart associated with their account
User.hasOne(Cart);
Cart.belongsTo(User);

//Users can have many addresses associated with their account
User.hasMany(Address);
Address.belongsTo(User);

// CartProduct is a connection table that connects a product to an order and keeps a quantity:
Cart.belongsToMany(Product, { through: CartProduct });
Product.belongsToMany(Cart, { through: CartProduct });

//Products each belong to 1 room. Room can have many products
Room.hasMany(Product);
Product.belongsTo(Room);

//export the database connection and models from this file
module.exports = {
  db,
  models: { User, Address, Order, OrderProduct, Cart, CartProduct, Product },
};
