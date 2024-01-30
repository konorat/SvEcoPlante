// const { Model } = require('sequelize');
const {Sequelize, sequelize } = require('../database/db')
const bcrypt = require('bcrypt');

// class User extends Model {}
// User.init({
//     name: Sequelize.STRING,
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true,
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     role: {
//       type: Sequelize.STRING,
//   }
// }, { sequelize, modelName: 'users' })

const User = sequelize.define('user', {
    name: {type: Sequelize.STRING},
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    img: {
      type: Sequelize.STRING,

    },
    about: {
      type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
      type: Sequelize.STRING,
  }
})

User.beforeCreate(async (user) => {
    user.role = 'user'
    if (user.password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
  });

// User.beforeUpdate(async (user) => {
//   if (user.password) {
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
//   }
// })

// sequelize.sync({ force: true })

module.exports = User
