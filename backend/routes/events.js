const express = require('express')
const {
    getEvents,
    createEvent,
    joinEvent,
    deleteEvent,
} = require('../controllers/eventController')

const router = express.Router()

// GET all events
router.get('/', getEvents)

// POST a new event
router.post('/', createEvent)

router.delete('/:id', deleteEvent)

module.exports = router