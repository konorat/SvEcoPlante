port = 3000

const jwt = require('jsonwebtoken');
const cors = require('cors');

const express = require('express')
const db = require('./database/db')
const app = express()
const userController = require('./controllers/UserController')
const plantController = require('./controllers/PlantController')
const registerController = require('./controllers/RegisterController')
const authenticateJWT = require('./security/SecurityConfig')

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(express.json())
app.use(cors(corsOptions))

db.sequelize.sync() // Use { force: true } apenas para desenvolvimento para recriar as tabelas
  .then(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`))
  .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  userController.loginUser(email, password)
    .then((token) => { res.json({ success: true, data: token }); })
    .catch((error) => res.json({ success: false, message: error }))

})

app.post('/logout', authenticateJWT, (req, res) => {
  BlockTokenList.create({
    token: req.headers.authorization
  }).then(() => {
    res.json({ loggout: true, message: "Deslogado com sucesso!" })
    res.end()
  }).catch(erro => console.log(erro))

})

app.post('/user', (req, res, next) => {
  userController.createUser({
    name: req.body.name,
    email: req.body.email,
    img: req.body.img,
    about: req.body.about,
    password: req.body.password
  })
    .then((user) => { res.json({ success: true, data: user }); })
    .catch((error) => res.json({ success: false, message: error }))
})

app.patch('/user', authenticateJWT, (req, res, next) => {

  const userId = returnUserID(req.headers.authorization.split(' ')[1])

  const userUpdated = {
    name: req.body.name,
    about: req.body.about,
    img: req.body.img
  }
  userController.updateUser(userId, userUpdated)
    .then((userUpdated) => { res.json({ success: true, data: userUpdated }); })
    .catch((error) => res.json({ success: false, message: error }))
})

app.post('/plant', authenticateJWT, (req, res, next) => {

  const userId = returnUserID(req.headers.authorization.split(' ')[1])

  plantController.createPlant({
    name: req.body.name,
    desc: req.body.desc,
    img: req.body.img,
    local: req.body.local,
    care_level: req.body.care_level,
    date_plant: req.body.date_plant,
    idUser: userId
  })
    .then((plant) => { res.json({ success: true, data: plant }); })
    .catch((error) => res.json({ success: false, message: error }))
})

app.get('/plants', authenticateJWT, (req, res) => {

  const userId = returnUserID(req.headers.authorization.split(' ')[1])

  plantController.getPlantsByUser(userId)
    .then((plants) => { res.json({ success: true, data: plants }); })
    .catch((error) => res.json({ success: false, message: error }))
})

app.patch('/plant', authenticateJWT, (req, res, next) => {

  const plantUpdated = {
    id: req.body.id,
    name: req.body.name,
    desc: req.body.desc,
    img: req.body.img,
    local: req.body.local,
    care_level: req.body.care_level
  }

  plantController.updatePlant(plantUpdated)
    .then(() => { res.json({ success: true, data: "Atualizado com sucesso" }); })
    .catch((error) => res.json({ success: false, message: error }))
})

app.delete('/plant/:id', authenticateJWT, (req, res) => {
  const plantId = req.params.id;

  plantController.deletePlant(plantId)
    .then(() => { res.json({ success: true, data: "Deletado com sucesso" }); })
    .catch((error) => res.json({ success: false, message: error }))
});

app.get('/registers/:id', authenticateJWT, (req, res) => {

  registerController.getRegistersByPlant(req.params.id)
    .then((registers) => { res.json({ success: true, data: registers }); })
    .catch((error) => res.json({ success: false, message: error }))
})

app.post('/register', authenticateJWT, (req, res, next) => {
  registerController.createRegister({
    pruning: req.body.pruning,
    watering: req.body.watering,
    img: req.body.img,
    fertilizing: req.body.fertilizing,
    description: req.body.description,
    idPlant: req.body.idPlant
  })
    .then((register) => { res.json({ success: true, data: register }); })
    .catch((error) => res.json({ success: false, message: error }))
})

app.patch('/register/:id', authenticateJWT, (req, res, next) => {
  const registerUpdated = {
    description: req.body.description
  }
  registerController.updateRegister(req.params.id, registerUpdated)
    .then((registerUpdated) => { res.json({ success: true, data: registerUpdated }); })
    .catch((error) => res.json({ success: false, message: error }))
})

app.delete('/register/:id', authenticateJWT, (req, res) => {
  const registerId = req.params.id;

  registerController.deleteRegister(registerId)
    .then(() => { res.json({ success: true, data: "Deletado com sucesso!" }); })
    .catch((error) => res.json({ success: false, message: error }))
});

function returnUserID(authorization) {

  const { userId } = jwt.decode(authorization)

  return userId
}

app.listen(port, () => {
  console.log(`Servidor iniciado! Porta: ${port}`)
})