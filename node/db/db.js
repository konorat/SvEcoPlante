const Sequelize = require('sequelize')
const sequelize = new Sequelize('ecoplante', 'root', 'root', {
	host: "db",
	dialect: 'mysql',
    query:{raw:true}
})

// const Discard = require('./Discard.js')
// const User = require('./User.js')

// User.hasMany(Discard, { as: 'discards' });
// Discard.belongsTo(User);

// sequelize.sync({ force: true }) 
//   .then(() => {
//     console.log('Tabelas sincronizadas com sucesso!');
//   })
//   .catch((err) => {
//     console.error('Erro ao sincronizar tabelas:', err);
//   });

// sequelize.sync()

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}