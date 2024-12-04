require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const url = process.env.MONGODB_URI;

const eventRoutes = require('./routes/events')
const userRoutes = require('./routes/user')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

app.use('/api/events', eventRoutes)
app.use('/api/user', userRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})