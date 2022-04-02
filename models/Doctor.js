const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    name: String,
    doctorid:String,
    type: String,
    phone: String,
    email: String,
})

module.exports = mongoose.model("Doctor", doctorSchema)