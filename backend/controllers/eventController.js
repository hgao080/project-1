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

const joinEvent = async (req, res, next) => {
  const { username } = req.body;

  await Event.findById(req.params.id).then((event) => {
    const updated = {
      name: event.name,
      description: event.description,
      date: event.date,
      users: event.users.concat(username),
    };

    Event.findByIdAndUpdate(req.params.id, updated, { new: true })
      .then((updatedEvent) => {
        res.json(updatedEvent);
      })
      .catch((err) => next(err));
  });
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
  joinEvent,
  deleteEvent,
};
