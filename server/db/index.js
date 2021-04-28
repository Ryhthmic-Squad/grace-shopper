const db = require('./db');
//Import all models here
//e.g. const Product = require('./Product');
const User = require('./User');
const Product = require('./Product');
const Room = require('./Room');
const Style = require('/Style');
const Furniture = require('./Furniture');
const Address = require('./Address');

//Set up relations for models here
//e.g. Product.belongsTo(Room);
User.hasMany(Address);
Address.belongsTo(User);

Product.belongsTo(Style);
Style.hasMany(Product);
Product.belongsTo(Room);
Room.hasMany(Product);
Product.belongsTo(Furniture);
Furniture.hasMany(Product);

//export the database connection and models from this file

module.exports = {
  db,
  models: { User, Product, Room, Style, Furniture, Address },
};
