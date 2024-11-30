import axios from 'axios'
const Url = 'http://localhost:3001/api/events'

const getAll = () => {
    const req = axios.get(Url)
    return req.then(res => res.data)
}

export default { getAll }