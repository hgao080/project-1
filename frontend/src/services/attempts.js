import axiosInstance from "./axiosInstance";

const saveAttempt = (data) => {
    return axiosInstance.post("/attempt", data).then((res) => res.data)
}

const getAttemptsForUser = (userEmail) => {
    return axiosInstance.get(`/attempt/${userEmail}`).then((res) => res.data).catch((err) => {
        console.log(err)
    })
}

export default { saveAttempt, getAttemptsForUser }