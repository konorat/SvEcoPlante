port = 3000

const express = require('express')
const db = require('./database/db')
const app = express()
const userController = require('./controllers/UserController')

app.use(express.json())

db.sequelize.sync() // Use { force: true } apenas para desenvolvimento para recriar as tabelas
  .then(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`))
  .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

app.post('/createUser', (req, res, next) => {
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

app.patch('/users/:id', (req, res, next) => {
  const userUpdated = {
      password: req.body.password
  }
  userController.updateUser(req.params.id, userUpdated).then((msg) => res.send(msg))
  .catch((err) => {
    console.log('Erro na consulta', JSON.stringify(err))
    return res.send(err)
  });           
})

app.listen(port, () => {
    console.log(`Servidor iniciado! Porta: ${port}`)
})