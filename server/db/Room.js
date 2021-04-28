const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Room extends Model {}
Room.init({
  roomName: {
    type: DataTypes.ENUM('dining', 'bedroom', 'bathroom', 'living'),
  },
  allowNull: false,
});

module.exports = Room;
