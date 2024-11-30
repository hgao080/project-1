require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const Event = require('./models/event')

const app = express()
const url = process.env.MONGODB_URI;

app.use(cors())
app.use(express.json())

mongoose.set('strictQuery', false)
mongoose.connect(url)
    
app.get('/api/events', (req, res) => {
    Event.find({}).then(events => {
        res.json(events)
    })
})

app.post('/api/events', (req, res) => {
    const body = req.body

    const event = new Event({
        name: body.name,
        description: body.description,
        date: body.date,
    })

    event.save().then(savedEvent => {
        res.json(savedEvent)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})