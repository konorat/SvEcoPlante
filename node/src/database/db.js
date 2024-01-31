const Sequelize = require('sequelize')
const sequelize = new Sequelize('ecoplante', 'root', 'root', {
    host: "localhost",
    dialect: 'mysql',
    query: { raw: true }
})


// sequelize.sync()

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}