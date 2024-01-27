const plantModel = require('../models/Plant');

/*
 * Lista todas as plantas.
 * @returns {Promise<Array>} Array de plantas.
 */
async function listPlants() {
  try {
    const plants = await plantModel.findAll();
    return plants;
  } catch (error) {
    throw new Error(`Erro ao listar plantas: ${error.message}`);
  }
}

/*
 * Cria uma nova planta.
 * @param {object} plant - Objeto representando a nova planta.
 * @returns {Promise<object>} Objeto representando a planta criada.
 */
async function createPlant(plant) {
  try {
    return await plantModel.create(plant);
  } catch (error) {
    throw new Error(`Erro ao criar planta: ${error.message}`);
  }
}

/*
 * Deleta uma planta.
 * @param {number} id_param - ID da planta a ser deletada.
 */
async function deletePlant(id_param) {
    try {

      const existingPlant = await plantModel.findOne({ where: { id: id_param } });
      if (!existingPlant) {
        throw new Error('Planta não encontrada.');
      }
  
      await plantModel.destroy({
        where: { id: id_param },
      });
    } catch (error) {
      throw new Error(`Erro ao deletar planta: ${error.message}`);
    }
}

/*
 * Obtém uma planta por ID.
 * @param {number} id_param - ID da planta a ser obtida.
 * @returns {Promise<object|null>} Objeto representando a planta encontrada ou null se não encontrada.
 */
async function getPlant(id_param) {
  try {
    const plant = await plantModel.findOne({ where: { id: id_param } });
    return plant;
  } catch (error) {
    throw new Error(`Erro ao obter planta: ${error.message}`);
  }
}

/*
 * Atualiza uma planta.
 * @param {number} id_param - ID da planta a ser atualizada.
 * @param {object} plantUpdated - Objeto representando as atualizações a serem aplicadas.
 */
async function updatePlant(id_param, plantUpdated) {
  try {
    await plantModel.update(plantUpdated, {
      where: { id: id_param },
    });
  } catch (error) {
    throw new Error(`Erro ao atualizar planta: ${error.message}`);
  }
}

/*
 * Obtém todas as plantas de um usuário.
 * @param {number} userId - ID do usuário para o qual obter as plantas.
 * @returns {Promise<Array>} Array de plantas do usuário.
 */
async function getPlantsByUser(userId) {
    try {
        const plants = await plantModel.findAll({ where: { idUser: userId } });
        return plants;
    } catch (error) {
        throw new Error(`Erro ao obter plantas por usuário: ${error.message}`);
    }
}

module.exports = { listPlants, createPlant, getPlant, deletePlant, updatePlant, getPlantsByUser};
