import axiosInstance from "./axiosInstance";

const getAll = () => {
  const req = axiosInstance.get("/competition");
  return req.then((res) => res.data);
};

const createCompetition = (competition) => {
  const req = axiosInstance.post("/competition", competition);
  return req.then((res) => res.data);
}

const addQuestionsToCompetition = (competitionTitle, data) => {
  const req = axiosInstance.put(`/competition/${competitionTitle}`, data)
  return req.then((res) => res.data)
}

const getQuestions = (competitionTitle) => {
  const req = axiosInstance.get(`/competition/${competitionTitle}`)
  return req.then(res => res.data)
}

export default { getAll, createCompetition, addQuestionsToCompetition, getQuestions };
