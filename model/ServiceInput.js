const mongoose = require('mongoose')

const ServiceInputSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    service:{
        type: String,
        required: true
    },
    msg:{
        type: String,
        default: false
    },
    date: {
        type: Date,
        default: Date.now 
    }
})

module.exports = mongoose.model("service-request-data", ServiceInputSchema)