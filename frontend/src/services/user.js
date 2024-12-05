import axios from "axios";
const Url = "/api/user";

const updateUser = (oldUsername, updatedName) => {
  const req = axios.put(`${Url}/${oldUsername}`, updatedName);
  return req.then((res) => res.data).catch((err) => err.response.data);
};

const updateJoinedEvents = (username, eventName) => {
  const req = axios.put(`${Url}/${username}`, eventName);
  return req.then((res) => res.data).catch((err) => err.response.data);
};

const getUsers = () => {
  const req = axios.get(Url);
  return req.then((res) => res.data);
};

const signupUser = (user) => {
  console.log(user);
  const req = axios.post(`${Url}/signup`, user);
  return req.then((res) => res.data).catch((err) => err.response.data);
};

export default { updateUser, getUsers, signupUser, updateJoinedEvents };
