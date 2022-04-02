const mongoose = require('mongoose')

const emergencyWardSchema = mongoose.Schema({
    patient_name: {
        type: String,
        required: [true, 'the name field is empty']
    },
    patient_id: {
        type: String,
        required: [true, 'the name field is empty']
    },
    blood_group: {
        type: String,
        required: [true, 'the blood group field is required']
    },
    gender: {
        type: String,
        required: [true, 'gender field is required']
    },
    contact: {
        type: String,
        required: [true, 'contact is required']
    },
    symptoms: {
        type: String,
        required: [true, 'this field is required']
    }
})

module.exports = mongoose.model('emergencyWardRegistration', emergencyWardSchema)