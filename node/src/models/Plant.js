const { Sequelize, sequelize } = require('../database/db');
const User = require('./User');

const Plant = sequelize.define('plant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O nome da planta é obrigatório.'
      },
      len: {
        args: [1, 255],
        msg: 'O nome da planta deve ter entre 1 e 255 caracteres.'
      }
    }
  },
  desc: Sequelize.STRING,
  img: Sequelize.STRING,
  local: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'A localização da planta é obrigatória.'
      }
    }
  },
  care_level: Sequelize.INTEGER,
  date_plant: {
    type: Sequelize.DATE,
    validate: {
      isDate: {
        msg: 'A data de plantio deve ser uma data válida.'
      }
    }
  },
  idUser: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O usuário proprietário da planta é obrigatório.'
      }
    }
  }
});

Plant.belongsTo(User, {
  constraint: true,
  foreignKey: 'idUser'
});

// sequelize.sync()

module.exports = Plant;


