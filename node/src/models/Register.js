const { Sequelize, sequelize } = require('../database/db');
const Plant = require('./Plant');

const Register = sequelize.define('register', {
  pruning: Sequelize.BOOLEAN,
  watering: Sequelize.BOOLEAN,
  img: Sequelize.STRING,
  fertilizing: Sequelize.BOOLEAN,
  idUsuario: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O usuário proprietário do registro é obrigatório.'
      }
    }
  },
  idPlant: {
    type: Sequelize.INTEGER,
    references: {
      model: 'plants',
      key: 'id'
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'A planta associada ao registro é obrigatória.'
      }
    }
  }
});

Register.belongsTo(Plant, {
  constraint: true,
  foreignKey: 'idPlant'
});

sequelize.sync();

module.exports = Register;