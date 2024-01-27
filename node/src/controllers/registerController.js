const registerModel = require('../models/Register');

/*
 * Lista todos os registros.
 * @returns {Promise<Array>} Array de registros.
 */
async function listRegisters() {
  try {
    const registers = await registerModel.findAll();
    return registers;
  } catch (error) {
    throw new Error(`Erro ao listar registros: ${error.message}`);
  }
}

/*
 * Cria um novo registro.
 * @param {object} register - Objeto representando o novo registro.
 * @returns {Promise<object>} Objeto representando o registro criado.
 */
async function createRegister(register) {
  try {
    return await registerModel.create(register);
  } catch (error) {
    throw new Error(`Erro ao criar registro: ${error.message}`);
  }
}

/*
 * Deleta um registro.
 * @param {number} id_param - ID do registro a ser deletado.
 */
async function deleteRegister(id_param) {
  try {
    await registerModel.destroy({ where: { id: id_param } });
  } catch (error) {
    throw new Error(`Erro ao deletar registro: ${error.message}`);
  }
}

/*
 * Obtém um registro por ID.
 * @param {number} id_param - ID do registro a ser obtido.
 * @returns {Promise<object|null>} Objeto representando o registro encontrado ou null se não encontrado.
 */
async function getRegisterById(id_param) {
  try {
    const register = await registerModel.findOne({ where: { id: id_param } });
    return register;
  } catch (error) {
    throw new Error(`Erro ao obter registro por ID: ${error.message}`);
  }
}

module.exports = { listRegisters, createRegister, deleteRegister, getRegisterById };