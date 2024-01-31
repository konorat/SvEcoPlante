const { Sequelize, sequelize } = require('../database/db')
const User = require('./User');

const Plant = sequelize.define('plants', {
  name: Sequelize.STRING,
  desc: Sequelize.STRING,
  img: Sequelize.TEXT,
  local: Sequelize.STRING,
  care_level: Sequelize.STRING,
  date_plant: Sequelize.STRING,
})

Plant.belongsTo(User, {
  constraint: true,
  foreignKey: 'idUser'
})


// sequelize.sync();

module.exports = Plant
