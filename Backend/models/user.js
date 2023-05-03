const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    conpassword: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: "https://res.cloudinary.com/dt0isai38/image/upload/v1674850149/default_kmiptn.png"
    }
})

mongoose.model('User', userSchema)