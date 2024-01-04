const { Model } = require('sequelize');
const {Sequelize, sequelize } = require('./db')
const bcrypt = require('bcrypt');

class Usuario extends Model {}
Usuario.init({
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
      type: Sequelize.STRING,
  }
}, { sequelize, modelName: 'usuarios' })

class Planta extends Model {}
Planta.init({
  nome_comum: Sequelize.STRING,
  descricao: Sequelize.STRING,
  foto: Sequelize.STRING,
  local: Sequelize.STRING,
  dificuldade: Sequelize.INTEGER,
  data_plantio: Sequelize.STRING,

}, { sequelize, modelName: 'planta' })

class Registro extends Model {}
Registro.init({
  poda: Sequelize.BOOLEAN,
  rega: Sequelize.BOOLEAN,
  foto: Sequelize.STRING,
  adubacao: Sequelize.BOOLEAN,
}, { sequelize, modelName: 'registro' })

class BlockTokenList extends Model {}
BlockTokenList.init({
  token: Sequelize.STRING
}, { sequelize, modelName: 'blocktokenlist' });

Usuario.beforeCreate(async (user) => {
    user.role = 'user'
    if (user.senha) {
      const saltRounds = 10;
      user.senha = await bcrypt.hash(user.senha, saltRounds);
    }
  });

  Planta.belongsTo(Usuario, {
    constraint: true,
    foreignKey: 'idUsuario'
  })


Usuario.hasMany(Planta,{
  foreignKey: 'idUsuario'
})

sequelize.sync()

module.exports = {
    Usuario: Usuario,
    Planta: Planta,
    Registro: Registro,
    BlockTokenList: BlockTokenList
}