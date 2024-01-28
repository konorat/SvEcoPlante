port = 3000

const express = require('express')
const db = require('./database/db')
const app = express()
const userController = require('./controllers/UserController')
const plantController = require('./controllers/PlantController')
const registerController = require('./controllers/RegisterController')
const authenticateJWT = require('./security/SecurityConfig')

app.use(express.json())

db.sequelize.sync() // Use { force: true } apenas para desenvolvimento para recriar as tabelas
  .then(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`))
  .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));


app.post('/login', async (req,res) => {
    const {email, password} = req.body;

    userController.loginUser(email, password)
      .then((token) => res.send(token))
      .catch((error) => res.send(error))

})

app.post('/logout', authenticateJWT, (req,res) =>{
    BlockTokenList.create({
        token: req.headers.authorization
    }).then(() => {
        res.json({loggout: true, message: "Deslogado com sucesso!"})
        res.end()
    }).catch( erro => console.log(erro))
    
})

app.post('/user', (req, res, next) => {
    userController.createUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    .then((user) => res.send(user))
    .catch((err) => {
      console.log('Erro ao Cadastrar Usuário', JSON.stringify(err))
      return res.status(400).send(err)
    })
})

app.patch('/user/:id', authenticateJWT, (req, res, next) => {
  const userUpdated = {
      password: req.body.password
  }
  userController.updateUser(req.params.id, userUpdated).then((msg) => res.send(msg))
  .catch((err) => {
    console.log('Erro na consulta', JSON.stringify(err))
    return res.send(err)
  });           
})

app.post('/plant', authenticateJWT, (req, res, next) => {
  plantController.createPlant({
    name: req.body.name,
    desc: req.body.desc,
    img: req.body.img,
    local: req.body.local,
    care_level: req.body.care_level,
    date_plant: req.body.date_plant,
    idUser: req.body.idUser
  })
  .then((plant) => res.send(plant))
  .catch((err) => {
    console.log('Erro ao Cadastrar Planta', JSON.stringify(err))
    return res.status(400).send(err)
  })
})

app.patch('/plant/:id', authenticateJWT, (req, res, next) => {
  const plantUpdated = {
    name: req.body.name,
    desc: req.body.desc,
    img: req.body.img,
    local: req.body.local,
    care_level: req.body.care_level
  }

  plantController.updatePlant(req.params.id, plantUpdated).then((msg) => res.send(msg))
  .catch((err) => {
    console.log('Erro na consulta', JSON.stringify(err))
    return res.send(err)
  });           
})

app.delete('/plant/:id', authenticateJWT, (req, res) => {
  const plantId = req.params.id;

  plantController.deletePlant(plantId)
    .then(() => res.send({ message: 'Plant deleted successfully' }))
    .catch((err) => {
      console.log('Error deleting plant', JSON.stringify(err));
      return res.status(400).send(err);
    });
});


app.post('/register', authenticateJWT, (req, res, next) => {
  registerController.createRegister({
    pruning: req.body.pruning,
    watering: req.body.watering,
    img: req.body.img,
    fertilizing: req.body.fertilizing,
    description: req.body.description,
    idPlant: req.body.idPlant
  })
  .then((register) => res.send(register))
  .catch((err) => {
    console.log('Erro ao Cadastrar Registro', JSON.stringify(err))
    return res.status(400).send(err)
  })
})

app.patch('/register/:id', authenticateJWT, (req, res, next) => {
  const registerUpdated = {
      description: req.body.description
  }
  registerController.updateRegister(req.params.id, registerUpdated).then((msg) => res.send(msg))
  .catch((err) => {
    console.log('Erro na consulta', JSON.stringify(err))
    return res.send(err)
  });           
})

app.delete('/register/:id', authenticateJWT, (req, res) => {
  const registerId = req.params.id;

  registerController.deleteRegister(registerId)
    .then(() => res.send({ message: 'Register deleted successfully' }))
    .catch((err) => {
      console.log('Error deleting register', JSON.stringify(err));
      return res.status(400).send(err);
    });
});

app.listen(port, () => {
    console.log(`Servidor iniciado! Porta: ${port}`)
})