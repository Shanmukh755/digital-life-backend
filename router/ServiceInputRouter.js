const express = require('express')
const router = express.Router()
const {postServiceRequset, getAllRequsets, deleteRequsetById} = require('../controller/ServiceInputController')

router.post('/', postServiceRequset)
router.get('/', getAllRequsets)
router.delete('/:id', deleteRequsetById)

module.exports = router