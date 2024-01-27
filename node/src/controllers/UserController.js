const userModel = require('../models/User');

/*
 * Lista todos os usuários.
 * @returns {Promise<Array>} Array de usuários.
 */
async function listUsers() {
  try {
    const users = await userModel.findAll();
    return users;
  } catch (error) {
    throw new Error(`Erro ao listar usuários: ${error.message}`);
  }
}

/*
 * Cria um novo usuário.
 * @param {object} user - Objeto representando o novo usuário.
 * @returns {Promise<object>} Objeto representando o usuário criado.
 */
async function createUser(user) {
  try {
    return await userModel.create(user);
  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error.message}`);
  }
}

/*
 * Deleta um usuário.
 * @param {number} id_param - ID do usuário a ser deletado.
 */
async function deleteUser(id_param) {
  try {
    await userModel.destroy({ where: { id: id_param } });
  } catch (error) {
    throw new Error(`Erro ao deletar usuário: ${error.message}`);
  }
}

/*
 * Obtém um usuário por ID.
 * @param {number} id_param - ID do usuário a ser obtido.
 * @returns {Promise<object|null>} Objeto representando o usuário encontrado ou null se não encontrado.
 */
async function getUser(id_param) {
  try {
    const user = await userModel.findOne({ where: { id: id_param } });
    return user;
  } catch (error) {
    throw new Error(`Erro ao obter usuário: ${error.message}`);
  }
}

/*
 * Atualiza um usuário.
 * @param {number} id_param - ID do usuário a ser atualizado.
 * @param {object} userUpdated - Objeto representando as atualizações a serem aplicadas.
 */
async function updateUser(id_param, userUpdated) {
  try {
    await userModel.update(userUpdated, {
      where: { id: id_param },
    });
  } catch (error) {
    throw new Error(`Erro ao atualizar usuário: ${error.message}`);
  }
}

/*
 * Atualiza a senha de um usuário por e-mail.
 * @param {string} email - E-mail do usuário a ser atualizado.
 * @param {string} newPassword - Nova senha a ser definida.
 */
async function updatePasswordByEmail(email, newPassword) {
  try {
    const user = await userModel.findOne({ where: { email: email } });

    if (user) {
      await userModel.update({ password: newPassword }, { where: { email: email } });
    } else {
      throw new Error('Usuário não encontrado.');
    }

  } catch (error) {
    throw new Error(`Erro ao atualizar senha por e-mail: ${error.message}`);
  }
}

// Obtém um usuário pelo e-mail.
// @param {string} email - E-mail do usuário a ser obtido.
// @returns {Promise<object|null>} Objeto representando o usuário encontrado ou null se não encontrado.
async function getUserByEmail(email) {
  try {
    const user = await userModel.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    throw new Error(`Erro ao obter usuário por e-mail: ${error.message}`);
  }
}

module.exports = { listUsers, createUser, getUser, deleteUser, updateUser, updatePasswordByEmail, getUserByEmail };
