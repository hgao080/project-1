const express = require('express')

const router = express.Router()
const Event = require('../models/event')

// GET all events
router.get('/', (req, res) => {
        Event.find({}).then(events => {
            res.json(events)
        })
})

// POST a new event
router.post('/', (req, res) => {
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

module.exports = router