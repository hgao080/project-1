import axios from "axios";
const Url = "/api/question";

const createQuestion = (question) => {
  const req = axios.post(Url, question);
  return req.then((res) => res.data);
}

const getAll = () => {
  const req = axios.get(Url);
  return req.then((res) => res.data);
}

export default { createQuestion, getAll };
