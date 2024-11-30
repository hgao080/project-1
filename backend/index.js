const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

let events = [
    {
        id: 1,
        name: "Henry's Birthday",
        date: "26/10/2005",
        description: "Meet at my house",
    },
    {
        id: 3,
        name: "Test Event 2",
        date: "15/08/2010",
        description: "This is a test",
    },
    {
        id: 2,
        name: "Test Event 3",
        date: "01/01/2024",
        description: "This is also a test",
    }
]

app.get('/api/events', (req, res) => {
    res.json(events)
})

app.post('/api/events', (req, res) => {
    const event = req.body
    events = events.concat(event)
    res.json(event)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})