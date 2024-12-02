import axios from 'axios'
const Url = 'http://localhost:3001/api/user'

const updateUser = (oldUsername, updatedName) => {
    const req = axios.put(`${Url}/${oldUsername}`, updatedName)
    return req.then(res => res.data)
}

export default { updateUser }