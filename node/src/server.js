port = 3000

const express = require('express')
const db = require('./database/db')
const app = express()
const userController = require('./controllers/UserController')
const plantController = require('./controllers/plantController')
const registerController = require('./controllers/registerController')

app.use(express.json())

db.sequelize.sync() // Use { force: true } apenas para desenvolvimento para recriar as tabelas
  .then(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`))
  .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

// Endpoint para criação de usuário
// CreateAccount: POST 
app.post('/users', (req, res, next) => {
    userController.createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        photo: user.photo,
        description: user.description
    })
    .then((user) => res.status(201).json({ success: true, data: user }))
    .catch((err) => {
      console.log('Erro ao Cadastrar Usuário', JSON.stringify(err))
      res.status(400).json({ success: false, error: err.message })
    })
});

// Endpoint para atualizar o perfil do usuário
// UpdateProfile: POST ou PUT
app.post('/updateUser/:idUser', async (req, res) => {
  try {
    const userId = req.params.idUser;
    const profileUpdates = req.body;

    const existingUser = await userController.getUser(userId);
    if (!existingUser) {
      return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
    }

    await userController.updateUser(userId, profileUpdates);

    res.status(200).json({ success: true, message: 'Perfil atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar perfil:', err);
    res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
  }
});

// Endpoint de login
// Login: POST
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userController.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, error: 'Senha incorreta.' });
    }

    return res.status(200).json({ success: true, message: 'Login bem-sucedido.' });
  } catch (err) {
    console.error('Erro ao realizar login:', err);
    return res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
  }
});

// Endpoint para recuperação de senha
// RecoverPassword: POST
app.post('/recoverPassword', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await userController.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
    }

    await userController.updatePasswordByEmail(email, newPassword);
    return res.status(200).json({ success: true, message: 'Senha atualizada com sucesso.' });
  } catch (err) {
    console.error('Erro ao recuperar senha:', err);
    return res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
  }
});

// Endpoint para criar uma nova planta
// CreatePlant: POST
app.post('/plants', async (req, res) => {
  try {
    const {
      namePlant,
      difficulty,
      local,
      datePlant,
      description,
      photoPlante,
      idUser // Atenção aqui, não sei como o front vai me enviar o id do usuário
    } = req.body;

    const userExists = await userController.getUser(idUser);
    if (!userExists) {
      return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
    }

    const newPlant = await plantController.createPlant({
      name: namePlant,
      care_level: difficulty,
      local: local,
      date_plant: datePlant,
      desc: description,
      img: photoPlante,
      idUser: idUser
    });
    res.status(201).json(newPlant);
  } catch (err) {
    console.error('Erro ao criar planta:', err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Endpoint para atualizar uma planta por ID
// UpdatePlant: PUT
app.put('/plants/:idPlant', async (req, res) => {
  try {
    const plantId = req.params.idPlant;
    const plantUpdated = req.body;

    const existingPlant = await plantController.getPlantById(plantId);
    if (!existingPlant) {
      return res.status(404).json({ success: false, error: 'Planta não encontrada.' });
    }

    await plantController.updatePlant(plantId, plantUpdated);
    res.status(200).json({ success: true, message: 'Planta atualizada com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar planta:', err);
    res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
  }
});

// Endpoint para obter todas as plantas de um usuário
// GetPlantsByUser: GET
app.get('/plantsByUser/:idUser', async (req, res) => {
  try {
    const userId = req.params.idUser;

    const userExists = await userController.getUser(userId);
    if (!userExists) {
      return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
    }

    const plants = await plantController.getPlantsByUser(userId);
    res.status(200).json(plants);
  } catch (err) {
    console.error('Erro ao obter plantas por usuário:', err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Endpoint para obter uma planta por ID
// GetPlantById: GET
app.get('/plantById/:idPlant', async (req, res) => {
  try {
    const plantId = req.params.idPlant;

    const plant = await plantController.getPlant(plantId);
    if (!plant) {
      return res.status(404).json({ success: false, error: 'Planta não encontrada.' });
    }

    res.status(200).json(plant);
  } catch (err) {
    console.error('Erro ao obter planta por ID:', err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Endpoint para deletar uma planta por ID
// DeletePlant: DELETE
app.delete('/plant/:idPlant', async (req, res) => {
  try {
    const plantId = req.params.idPlant;

    await plantController.deletePlant(plantId);
    res.status(200).json({ success: true, message: 'Planta deletada com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar planta:', err);
    res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
  }
});

// Endpoint para criar um novo registro
// CreateRegister: POST
app.post('/registers', async (req, res) => {
  try {
    const { rega, poda, adubacao, photo, idPlant } = req.body;

    const plant = await plantController.getPlantById(idPlant);
    if (!plant) {
      return res.status(404).json({ success: false, error: 'Planta não encontrada.' });
    }

    const newRegister = await registerController.createRegister({
      pruning: rega,
      watering: poda,
      fertilizing: adubacao,
      img: photo,
      idPlant: idPlant
    });
    res.status(201).json(newRegister);
  } catch (err) {
    console.error('Erro ao criar registro:', err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Endpoint para atualizar um registro por ID
// UpdateRegister: PUT
app.put('/registers/:idRegister', async (req, res) => {
  try {
    const registerId = req.params.idRegister;
    const registerUpdated = req.body;

    const existingRegister = await registerController.getRegisterById(registerId);
    if (!existingRegister) {
      return res.status(404).json({ success: false, error: 'Registro não encontrado.' });
    }

    await registerController.updateRegister(registerId, registerUpdated);
    res.status(200).json({ success: true, message: 'Registro atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar registro:', err);
    res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
  }
});

// Endpoint para deletar um registro por ID
// DeleteRegister: DELETE
app.delete('/register/:idRegister', async (req, res) => {
  try {
    const registerId = req.params.idRegister;

    await registerController.deleteRegister(registerId);
    res.status(200).json({ success: true, message: 'Registro deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar registro:', err);
    res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
  }
});

app.listen(port, () => {
    console.log(`Servidor iniciado! Porta: ${port}`)
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
});