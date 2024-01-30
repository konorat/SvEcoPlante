const {Sequelize, sequelize } = require('../database/db')

const BlockTokenList = sequelize.define('block_token_list', {
  token: Sequelize.STRING,
})

// sequelize.sync()

module.exports = BlockTokenList
