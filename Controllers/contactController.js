const asyncHandler = require('express-async-handler')
const Contact = require('../Models/contactModel')
//@desc get all contacts
//@route get api/contacts
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find(req.params.id)
    res.send(contacts)
})

//@desc get a contacts
//@route get api/contacts/:id
//@access private
const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }
    res.status(200).send(contact)
})

//@desc create new contact
//@route post api/contacts
//@access private
const postContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body
    console.log(req.body)
    if (!name || !phone) {
        res.status(400)
        throw new Error("Name and phone is mandatory")
    }
    const contact = await Contact.create({ name, email, phone, user_id: req.user.id })
    res.send(contact)
})

//@desc updates a contact
//@route put api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error('Unauthorized to update data!')
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body
        , { new: true })
    res.send(updatedContact)
})


//@desc delete a contact
//@route delete api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error('Unauthorized to delete contact!')
    }
    res.status(200).send(contact)
    res.send(contact)
})

module.exports = { getContact, getContactById, postContact, updateContact, deleteContact }