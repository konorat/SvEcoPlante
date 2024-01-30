const userModel = require('../models/User')
const bcrypt = require('bcrypt')
const SECRET = '3lz41fmg-bs1-1nf0'
const jwt = require('jsonwebtoken');

async function loginUser(email, password) {

  const user = await userModel.findOne({where: { email: email}})

  if(!user){
    throw new Error("Email não encontrado");
  }else{
      const passwordMatch = await bcrypt.compare(password, user.password);

      console.log("token: " + passwordMatch)

      if(passwordMatch){
          const token = `Bearer ${jwt.sign({userId: user.id, role: user.role}, SECRET, { expiresIn: 10000000})}`
          return {...user,token}
      }else{
          throw new Error("Senha inválida!")
      }
  }
}

async function listUsers(){
  const users = await userModel.findAll();
  return users;
}

async function createUser(user){
  return userModel.create(user);
}

async function deleteUser(id_param){
  await userModel.destroy({where : {id : id_param}}); // Replace deleteItem with destroy
}

async function getUser(id_param){
  const user = await userModel.findOne({where : {id : id_param}})
  return user;
}

async function updateUser(id_param, userUpdated){
  await userModel.update(userUpdated,{
    where: {
      id: id_param
    }
  })
  return userUpdated;
}

module.exports = {loginUser, listUsers, createUser, getUser, deleteUser, updateUser}