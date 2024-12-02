import axios from 'axios'
const Url = 'http://localhost:3001/api/events'

const getAll = () => {
    const req = axios.get(Url)
    return req.then(res => res.data)
}

const createEvent = (newEvent) => {
    const req = axios.post(Url, newEvent)
    return req.then(res => res.data)
}

const joinEvent = (eventId, user) => {
    const req = axios.put(`${Url}/${eventId}`, user)
    return req.then(res => res.data)
}

export default { getAll, createEvent, joinEvent }