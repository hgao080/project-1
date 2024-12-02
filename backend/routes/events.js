const express = require('express')
const {
    getEvents,
    createEvent,
    joinEvent,
} = require('../controllers/eventController')

const router = express.Router()

// GET all events
router.get('/', getEvents)

// POST a new event
router.post('/', createEvent)

router.put('/:id', joinEvent)

module.exports = router