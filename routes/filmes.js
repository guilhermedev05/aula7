const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

const dataPath = path.join(__dirname, '../data/filmes.json')

const lerFilmes = () => JSON.parse(fs.readFileSync(dataPath))
const salvarFilmes = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data))
}

router.get('/', (req, res) => {
    let filmes = lerFilmes();
    res.status(200).json(filmes)
})

router.get('/:id', (req, res) => {
    let filmes = lerFilmes()
    let id = req.params.id
    let filmeEncontrado = filmes.find(filme => filme.id == id)
    if (!filmeEncontrado)
        return res.status(404).json({ "erro": "Filme não encontrado" })
    res.status(200).json(filmeEncontrado)
})

router.post('/', (req, res) => {
    let filmes = lerFilmes()
    let novoFilme = {
        id: Date.now(),
        ...req.body
    }
    filmes.push(novoFilme)
    salvarFilmes(filmes)

    return res.status(201).json(novoFilme)
})

router.put('/:id', (req, res) => {
    let filmes = lerFilmes()
    let filmeEditado = filmes.find(filme => filme.id == req.params.id)
    let filmeId = filmeEditado.id
    filmeEditado = {
        id: filmeId,
        ...req.body
    }
    let filmeIndex = filmes.findIndex(filme => filme.id == req.params.id)
    filmes[filmeIndex] = filmeEditado
    salvarFilmes(filmes)
    return res.status(201).json(filmeEditado)
})

router.delete('/:id', (req, res) => {
    let filmes = lerFilmes()
    filmes = filmes.filter(filme => filme.id != req.params.id)
    salvarFilmes(filmes)

    return res.status(204)
})

module.exports = router