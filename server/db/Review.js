const { DataTypes, Model } = require('sequelize');
const db = require('./db');

class Review extends Model {}
Review.init(
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    text: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: Date.now,
    },
  },
  { sequelize: db, modelName: 'reviews', timestamps: false }
);

module.exports = Review;
