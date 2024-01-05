const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded())

const {Usuario, Planta, Registro, BlockTokenList} = require('../src/models/model')


app.listen(3000, ()=> {
    console.log("rodando na porta 3000")
})

app.post('/cadastrarUsuario', (req, res) => {

})