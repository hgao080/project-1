import axios from 'axios'
const Url = "/api/attempt"

const saveAttempt = (data) => {
    return axios.post(Url, data).then((res) => res.data)
}

const getAttemptsForUser = (userEmail) => {
    return axios.get(`${Url}/${userEmail}`).then((res) => res.data)
}

export default { saveAttempt, getAttemptsForUser }