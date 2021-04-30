const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Room extends Model {}
Room.init(
  {
    name: {
      type: DataTypes.ENUM('dining', 'bedroom', 'bathroom', 'living'),
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'room' }
);

module.exports = Room;
