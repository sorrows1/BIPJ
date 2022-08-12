const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Code = require('./Code.model')
const Reward = require('./Reward.model')
const User = require('./User.model')

const RewardCodes = Reward.hasMany(Code)
const UserCodes = User.hasMany(Code)

module.exports.Code = Code;
module.exports.Reward = Reward;
module.exports.User = User;
module.exports.RewardCodes = RewardCodes
module.exports.UserCodes = UserCodes;