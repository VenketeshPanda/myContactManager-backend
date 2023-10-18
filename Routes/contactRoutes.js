const express = require('express')
const router = express.Router()
const { getContact, getContactById, postContact, updateContact, deleteContact } = require('../Controllers/contactController')
const validateToken = require('../Middlewares/validateTokenHandler')


router.use(validateToken) 
router.get('/', getContact).post('/', postContact)
router.get('/:id', getContactById)
router.put('/:id', updateContact)
router.delete('/:id', deleteContact)

module.exports = router
