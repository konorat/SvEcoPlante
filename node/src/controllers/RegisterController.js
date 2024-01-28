const registerModel = require('../models/Register')

async function listRegisters(){
  const registers = await registerModel.findAll()
  return registers;
}

async function getRegistersByPlant(idPlant) {
  const registers = await registerModel.findAll({ where: { idPlant: idPlant } });
  return registers;
}

async function createRegister(register){
  return registerModel.create(register);
}

async function deleteRegister(id_param){
  await registerModel.destroy({where : {id : id_param}})
}

async function getRegister(id_param){
  const register = await registerModel.findOne({where : {id : id_param}})
  return register;
}

async function updateRegister(id_param, registerUpdated){
  await registerModel.update(registerUpdated,{
    where: {
      id: id_param
    }
  });
}

module.exports = {listRegisters, getRegistersByPlant, createRegister, getRegister, deleteRegister, updateRegister}