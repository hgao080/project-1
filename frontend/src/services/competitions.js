import axios from "axios";
const Url = "/api/competition";

const getAll = () => {
  const req = axios.get(Url);
  return req.then((res) => res.data);
};

const createCompetition = (competition) => {
  const req = axios.post(Url, competition);
  return req.then((res) => res.data);
}

const addQuestionToCompetition = (competitionTitle, question) => {
  const req = axios.put(`${Url}/${competitionTitle}`, question)
  return req.then((res) => res.data)
}

export default { getAll, createCompetition, addQuestionToCompetition };
