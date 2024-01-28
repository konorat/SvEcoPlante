const plantModel = require('../models/Plant')

async function listPlants(){
  const users = await userModel.findAll();
  return users;
}

async function createPlant(plant){
  return plantModel.create(plant);
}

async function deletePlant(id_param){
  await plantModel.destroy({where : {id : id_param}}); // Replace deleteItem with destroy
}

async function getPlant(id_param){
  const user = await plantModel.findOne({where : {id : id_param}})
  return user;
}

async function updatePlant(id_param, userUpdated){
  await plantModel.update(userUpdated,{
    where: {
      id: id_param
    }
  });
}

module.exports = {listPlants, createPlant, getPlant, deletePlant, updatePlant}