const plantModel = require('../models/Plant')

async function listPlants(){
  const plants = await plantModel.findAll();
  return plants;
}

async function getPlantsByUser(idUser) {
    const plants = await plantModel.findAll({ where: { idUser: idUser } });
    return plants;
  }

async function createPlant(plant){
  return plantModel.create(plant);
}

async function deletePlant(id_param){
  await plantModel.destroy({where : {id : id_param}}); // Replace deleteItem with destroy
}

async function getPlant(id_param){
  const plant = await plantModel.findOne({where : {id : id_param}})
  return plant;
}

async function updatePlant(plantUpdated){
  await plantModel.update(plantUpdated,{
    where: {
      id: plantUpdated.id
    }
  });
}

module.exports = {listPlants, getPlantsByUser, createPlant, getPlant, deletePlant, updatePlant}