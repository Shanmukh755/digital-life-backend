const { required } = require('joi')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        required: true
    }
})

module.exports = mongoose.model('user-data', userSchema)