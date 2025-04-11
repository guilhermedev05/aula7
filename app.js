const express = require('express')
const receitasRouter = require('./routes/receitas') //  ./ = Pasta que eu estou || ../ = Sobe um nível
const app = express()
const PORT = 3000;

app.use(express.json())
app.use('/api/receitas', receitasRouter) // Caiu na url, manda pra rota livrosRouter

app.listen(PORT, () => console.log("Servidor rodando"))

module.exports = app