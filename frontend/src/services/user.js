import axiosInstance from "./axiosInstance";

const updateUser = (oldUsername, updatedName) => {
  const req = axiosInstance.put(`/user/${oldUsername}`, updatedName);
  return req.then((res) => res.data).catch((err) => err.response.data);
};

const updateJoinedEvents = (username, eventName) => {
  const req = axiosInstance.put(`/user/${username}`, eventName);
  return req.then((res) => res.data).catch((err) => err.response.data);
};

const getUsers = () => {
  const req = axiosInstance.get("/user");
  return req.then((res) => res.data);
};

const signupUser = (user) => {
  const req = axiosInstance.post(`/user/signup`, user);
  return req.then((res) => res.data).catch((err) => err.response.data);
};

const loginUser = (user) => {
  const req = axiosInstance.post(`/user/login`, user);
  return req.then((res) => res.data).catch((err) => err.response.data);
}

export default { updateUser, getUsers, signupUser, updateJoinedEvents, loginUser };
