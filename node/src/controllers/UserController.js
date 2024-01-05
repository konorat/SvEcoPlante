const userModel = require('../models/User')

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
  });
}

module.exports = {listUsers, createUser, getUser, deleteUser, updateUser}