const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: [true, 'Please add email address'],
        unique: [true, 'This email address is already taken']
    },
    password: {
        type: String,
        require: true,
    }
}, { timestamps: true })


module.exports = mongoose.model('User', userSchema)