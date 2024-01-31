const { Sequelize, sequelize } = require('../database/db')
const bcrypt = require('bcrypt');
const Plant = require('./Plant')

const Register = sequelize.define('registers', {
  pruning: Sequelize.STRING,
  watering: Sequelize.STRING,
  img: Sequelize.TEXT('long'),
  fertilizing: Sequelize.STRING,
  description: Sequelize.STRING
})

Register.belongsTo(Plant, {
  constraint: true,
  foreignKey: 'idPlant'
})

// sequelize.sync()

module.exports = Register