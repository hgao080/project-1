import axios from 'axios'
const Url = "/api/attempt"

const saveAttempt = (data) => {
    return axios.post(Url, data).then((res) => res.data)
}

export default { saveAttempt }