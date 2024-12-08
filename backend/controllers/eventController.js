const Event = require("../models/eventModel");

// Get all events
const getEvents = async (req, res) => {
  const events = await Event.find({});

  res.status(200).json(events);
};

// Crate a new event
const createEvent = async (req, res) => {
  const { name, description, date } = req.body;

  try {
    const event = await Event.create({ name, description, date });
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteEvent = async (req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
};

module.exports = {
  getEvents,
  createEvent,
  deleteEvent,
};
