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
const EmergencyWard = require('./models/EmergencyWard')

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


app.get('/patients-module/patients-list/:id', async(req, res) => {
    const { id } = req.params
    try{
        if(id === 'all'){
            const allPatients = await Patient.find({})
            res.json(allPatients)
        }
        else{
            const Patients = await Patient.find({ailment: id})
            res.json(Patients)
        }
    }
    catch(err){
        res.status(400).json('No patients registered yet')
    }
})

app.get('/doctor/:id', async(req, res) => {
    const {id} = req.params
    try{
        const retrievedDoctor = await Doctor.findOne({doctorid: id})
        res.json(retrievedDoctor)
    }
    catch(err){
        res.status(400).json('Doctor not found')
    }
})

app.get('/emergencyward', async(req, res) => {
    try{
        const emergencyPatients = await EmergencyWard.find({})
        res.json(emergencyPatients)
    }
    catch(err){
        res.status(400).json('No patients in emergency ward')
    }
})

app.get('/patients-module/patient-profile/:id', (req, res) => {
    const  patientid  = req.params;
    Patient.findOne({patient_id: patientid.id}, function(err, p){
        if(err){
            res.status(400).json('No patient exists')
        }
        else{
            res.json(p)
        }
    })
})

app.get('/doctors-list/:id', async(req, res) => {
    const { id } = req.params;
    try{
        if(id === 'all'){
            const allDoctors = await Doctor.find({})
            res.json(allDoctors)
        }
        else{
            const someDoctors = await Doctor.find({type: id})
            res.json(someDoctors)
        }
    }
    catch(err){
        res.status(400).json('no doctors registered yet')
    }
})


app.post('/emergency-ward-registration', async(req, res) => {
    const emergencyPatient = new emergencyWardRegistration(req.body)
    try{
        const savedEmergencyPatient = await emergencyPatient.save()
        res.json(savedEmergencyPatient) 
    }
    catch(err){
        res.status(500).json('could not register :(')
    }
})

app.post('/patient-register', async(req, res) => {
    const newPatient = new Patient(req.body)
    try{
        const savedPatient = await newPatient.save();
        res.json(savedPatient)
    }
    catch(err){
        res.status(500).json('could not register the patient :(')
    }
})

app.patch('/assign-doctor/:id', async(req, res) => {
    const { id } = req.params
    try {
        const updatedAssignedDoctor = await Patient.findOne({patient_id: id})
        Object.assign(updatedAssignedDoctor, req.body)
        updatedAssignedDoctor.save()
        res.json({message: 'success', result: updatedAssignedDoctor})
    }
    catch (err) {
        res.status(500).json('error')
    }
})

app.post('/prescription', async(req, res) => {
    const Pres = new Prescription(req.body)
    try{
        const savedPres = await Pres.save();
        res.json(savedPres)
    }
    catch(err){
        res.status(500).json('could not save the prescription')
    }
})

app.post('/doctor-register', async(req, res) => {
    const doc = new Doctor(req.body)
    try{
        const savedDoc = await doc.save();
        res.json(savedDoc)
    }
    catch(err){
        res.status(400).json('could not register')
    }
})

app.get('/prescription/:id', async(req,res) => {
    const {id} = req.params
    try{
        const retirvedPrescription = await Prescription.find({patient_id: id})
        res.json(retirvedPrescription)
    }
    catch(err){
        res.status(400).json('not found')
    }
})

app.delete('/prescription/:id', async (req, res) => {
    const {id} = req.params
    try {
        const r = await Patient.deleteOne({patient_id:id})
        if(r.deletedCount == '1'){
            res.json('success')
        }
        else {
            res.status(400).json('error')
        }
    }
    catch(err) {
        res.status(500).json('error')
    }
})

app.listen('3000', () => {
    console.log('listening at 3000')
})