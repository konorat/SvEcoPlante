const {Sequelize, sequelize } = require('../database/db')
const bcrypt = require('bcrypt');
const Plant = require('./Plant')

const Register = sequelize.define('register', {
  pruning: Sequelize.BOOLEAN,
  watering: Sequelize.BOOLEAN,
  img: Sequelize.STRING,
  fertilizing: Sequelize.BOOLEAN,
  description: Sequelize.STRING
})

Register.belongsTo(Plant, {
    constraint: true,
    foreignKey: 'idPlant'
  })

// sequelize.sync()

module.exports = Register