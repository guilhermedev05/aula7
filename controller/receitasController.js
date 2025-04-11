const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

const dataPath = path.join(__dirname, '../data/receitas.json')

const lerReceitas = () => JSON.parse(fs.readFileSync(dataPath))
const salvarReceitas = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data))
}

function listarReceitas(req, res) {
    let receitas = lerReceitas();
    res.status(200).json(receitas)
}

function buscarReceitaPorId(req, res) {
    let receitas = lerReceitas()
    let id = req.params.id
    let receitaEncontrada = receitas.find(receita => receita.id == id)
    if (!receitaEncontrada){
        return res.status(404).json({ "erro": "Receita não encontrada" })
    }
    res.status(200).json(receitaEncontrada)
}

function adicionarReceita(req, res) {
    let receitas = lerReceitas()
    let novaReceita = {
        id: Date.now(),
        ...req.body
    }
    receitas.push(novaReceita)
    salvarReceitas(receitas)

    return res.status(201).json(novaReceita)
}

function atualizarReceita(req, res) {
    let receitas = lerReceitas()
    let receitaEditada = receitas.find(receita => receita.id == req.params.id)
    let receitaId = receitaEditada.id
    receitaEditada = {
        id: receitaId,
        ...req.body
    }
    let receitaIndex = receitas.findIndex(receita => receita.id == req.params.id)
    receitas[receitaIndex] = receitaEditada
    salvarReceitas(receitas)
    return res.status(201).json(receitaEditada)
}

function removerReceita(req, res){
    let receitas = lerReceitas()
    receitas = receitas.filter(receita => receita.id != req.params.id)
    salvarReceitas(receitas)

    res.status(204)
}

module.exports = {
    listarReceitas,
    buscarReceitaPorId,
    adicionarReceita,
    atualizarReceita,
    removerReceita
}