import axios from 'axios'
const Url = '/api/user'

const updateUser = (oldUsername, updatedName) => {
    const req = axios.put(`${Url}/${oldUsername}`, updatedName)
    console.log(req)
    return req.then(res => res.data).catch(err => err.response.data)
}

const getUsers = () => {
    const req = axios.get(Url)
    return req.then(res => res.data)
}

export default { updateUser, getUsers }