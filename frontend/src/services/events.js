import axios from 'axios'
const Url = '/api/events'

const getAll = () => {
    const req = axios.get(Url)
    return req.then(res => res.data)
}

const createEvent = (newEvent) => {
    const req = axios.post(Url, newEvent)
    return req.then(res => res.data)
}

const joinEvent = (eventId, joiningUser) => {
    const req = axios.put(`${Url}/${eventId}`, joiningUser)
    return req.then(res => res.data)
}

export default { getAll, createEvent, joinEvent }