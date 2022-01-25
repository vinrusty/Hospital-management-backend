const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    name: String,
    type: String,
    doctor_id: String,
    phone: String,
    email: String
})

module.exports = mongoose.model("Doctor", doctorSchema)