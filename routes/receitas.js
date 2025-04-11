const express = require('express')
const router = express.Router()

const {
    listarReceitas,
    buscarReceitaPorId,
    adicionarReceita,
    atualizarReceita,
    removerReceita
} = require('../controller/receitasController')

router.get('/', listarReceitas)
router.get('/:id', buscarReceitaPorId)
router.post('/', adicionarReceita),
router.put('/:id', atualizarReceita),
router.delete('/:id', removerReceita)

module.exports = router