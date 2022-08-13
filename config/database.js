const { Sequelize } = require('sequelize');
const { config } = require('./config');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: config.dialect,
    dialectOptions: {
      supportBigNumbers: true,
    },
    host: config.host,
    define: {
      timestamps: false,
    },
    timezone: '+08:00',
  }
);

module.exports = sequelize;
