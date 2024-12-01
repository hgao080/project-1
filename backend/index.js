require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const url = process.env.MONGODB_URI;

const eventRoutes = require('./routes/events')

app.use(cors())
app.use(express.json())

mongoose.set('strictQuery', false)
mongoose.connect(url)

app.use('/api/events', eventRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})