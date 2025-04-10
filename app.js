const express = require('express')
const filmesRouter = require('./routes/filmes') //  ./ = Pasta que eu estou || ../ = Sobe um nível
const app = express()
const PORT = 3000;

app.use(express.json())
app.use('/api/filmes', filmesRouter) // Caiu na url, manda pra rota livrosRouter

app.listen(PORT, () => console.log("Servidor rodando"))

module.exports = app