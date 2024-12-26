import axios from 'axios'
const Url = "/api/attempt"

const saveAttempt = (attempt) => {
    return axios.post(Url, attempt).then((res) => res.data)
}

export default { saveAttempt }