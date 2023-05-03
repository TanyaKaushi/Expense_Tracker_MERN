const mongoose = require('mongoose');
const { MONGODBURI } = require("../keys");

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB connect')


    } catch (error) {
        console.log('DB not connect')
    }
}

module.exports = {db}