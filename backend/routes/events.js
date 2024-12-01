const express = require('express')
const {
    getEvents,
    createEvent,
} = require('../controllers/eventController')

const router = express.Router()

// GET all events
router.get('/', getEvents)

// POST a new event
router.post('/', createEvent)

module.exports = router