require('dotenv').config()
const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: String,
})

eventSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Event', eventSchema)