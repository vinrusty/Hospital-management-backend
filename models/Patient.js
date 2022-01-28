const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'the Name field is empty!']
    },
    age: {
        type: Number,
        required: [true, 'Age of the patient is required!']
    },
    blood_group: {
        type: String,
        required: [true, 'Blood group is required']
    },
    ailment: {
        type: String,
        required: [true, 'Ailment of the patient is required!']
    },
    address: String,
    email: {
        type: String,
        required: [true, 'Contact of the patient is required']
    },
    phone: {
        type: String,
        required: [true, 'Contact of the patient is required']
    },
    symptom: {
        type: String,
        required: [true, 'Contact of the patient is required']
    },
    joined_date: String,
    joined_time: String
})

module.exports = mongoose.model("Patient", patientSchema)

