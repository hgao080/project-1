import axiosInstance from "./axiosInstance";

const getAll = () => {
  const req = axiosInstance.get("/events");
  return req.then((res) => res.data);
};

const createEvent = (newEvent) => {
  const req = axiosInstance.post("/events", newEvent);
  return req.then((res) => res.data);
};

const joinEvent = (eventId, joiningUser) => {
  const req = axiosInstance.put(`/events/${eventId}`, joiningUser);
  return req.then((res) => res.data);
};

const deleteEvent = (eventId) => {
  const req = axiosInstance.delete(`/events/${eventId}`);
  return req.then((res) => res);
};

const addCompetition = (eventId, data) => {
  const req = axiosInstance.put(`/events/${eventId}`, data)
  return req.then((res) => res.data)
}

const markEvent = (eventId) => {
  const req = axiosInstance.get(`/events/mark/${eventId}`);
  return req.then((res) => res.data);
};

const getEvent = (eventId) => {
  const req = axiosInstance.get(`/events/${eventId}`);
  return req.then((res) => res.data).catch((err) => {
    console.log(err);
    return null;
  });
}

export default { getAll, createEvent, joinEvent, deleteEvent, addCompetition, markEvent, getEvent };
