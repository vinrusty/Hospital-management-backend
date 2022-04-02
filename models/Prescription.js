const mongoose = require('mongoose')

const prescriptionSchema = new mongoose.Schema({
    date: String,
    patient_name: {
        type: String,
        required: ['true', '#']
    },
    patient_id: {
        type: String,
        required: ['true','#']
    },
    prescription: {
        type: String,
        required: ['true', '#']
    }
})

module.exports = mongoose.model("Prescription", prescriptionSchema)