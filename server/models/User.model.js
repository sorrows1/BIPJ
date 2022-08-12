const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);

module.exports = User;
