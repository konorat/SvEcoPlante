const { Sequelize, sequelize } = require('../database/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O nome do usuário é obrigatório.'
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      msg: 'Este endereço de e-mail já está em uso.'
    },
    validate: {
      notNull: {
        msg: 'O e-mail do usuário é obrigatório.'
      },
      isEmail: {
        msg: 'O e-mail deve ser um endereço de e-mail válido.'
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'A senha do usuário é obrigatória.'
      }
    }
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: 'user'
  },
  photo: {
    type: Sequelize.STRING,
    allowNull: true, // Pode ser nulo se o usuário não fornecer uma foto
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true, // Pode ser nula se o usuário não fornecer uma descrição
  }
});

User.beforeCreate(async (user) => {
  if (user.password) {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
});

User.beforeUpdate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

module.exports = User;
