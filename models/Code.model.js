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
    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    useDate: {
      type: DataTypes.DATE,
    },
    redeemDate: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: true }
);

module.exports = Code;
