const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const Patient = require('./models/Patient')
const Prescription = require('./models/Prescription')
const Doctor = require('./models/Doctor')
const emergencyWardRegistration = require('./models/EmergencyWard')
const dotenv = require('dotenv')

dotenv.config()

try{
    mongoose.connect(process.env.URL,
    {useNewUrlParser: true, useUnifiedTopology: true},
        () => {
            console.log('connected to the database!')
        }
    )
}
catch(e){
    console.log("coudn't connect :(")
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())


app.get('/patients-module/patients-list', async(req, res) => {
    try{
        const allPatients = await Patient.find({})
        res.json(allPatients)
    }
    catch(err){
        res.status.json('No patients registered yet')
    }
})

app.get('/doctors-module', (req, res) => {

})

app.post('/doctors-module/emergency-ward-registration', async(req, res) => {
    const emergencyPatient = new emergencyWardRegistration(req.body)
    try{
        const savedEmergencyPatient = await emergencyPatient.save()
        res.json(savedEmergencyPatient) 
    }
    catch(err){
        res.status(400).json('could not register :(')
    }
})

app.post('/patient-register', async(req, res) => {
    const newPatient = new Patient(req.body)
    try{
        const savedPatient = await newPatient.save();
        res.json(savedPatient)
    }
    catch(err){
        res.status(400).json('could not register the patient :(')
    }
})

app.post('/prescription', async(req, res) => {
    const Pres = new Prescription(req.body)
    try{
        const savedPres = await Pres.save();
        res.json(savedPres)
    }
    catch(err){
        res.status(400).json('could not save the prescription')
    }
})

app.listen('3000', () => {
    console.log('listening at 3000')
})