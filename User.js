const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    price: Sequelize.STRING,
    table:{
        type:Sequelize.STRING,
        allowNull: false
    },
    menu:{
        type:Sequelize.STRING,
        allowNull:false
    },
    extra: Sequelize.STRING
})

module.exports = User;