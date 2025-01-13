import axiosInstance from "./axiosInstance";

const createQuestion = (question) => {
  const req = axiosInstance.post("question", question);
  return req.then((res) => res.data);
}

const getAll = () => {
  const req = axiosInstance.get("question");
  return req.then((res) => res.data);
}

export default { createQuestion, getAll };
