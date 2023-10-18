const db = require("mysql2");
const Sequelize = require('sequelize');

const sequelize = new Sequelize('resturant_menu', 'root', 'good@123', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;