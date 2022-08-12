const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Code = sequelize.define(
  'codes',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    redeemed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { timestamps: true }
);

module.exports = Code;
