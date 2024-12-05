require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user.id);

    res.status(200).json({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// signup user
const signUpUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    console.log("Hi");
    const user = await User.signUp(email, password, username);
    console.log("Hi1");
    const token = createToken(user.id);
    console.log("Hi2");
    res.status(200).json({ username, email, isAdmin: user.isAdmin, token });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const updateUser = async (req, res, next) => {
  if ("username" in req.body) {
    const { username } = req.body;

    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already in use" });
      }

      await User.find({ username: req.params.name }).then((user) => {
        const updated = {
          ...user._doc,
          username: username,
        };

        User.findOneAndUpdate({ username: req.params.name }, updated, {
          new: true,
        })
          .then((updatedUser) => {
            res.json(updatedUser);
          })
          .catch((error) => next(error));
      });
    } catch (error) {
      next(error);
    }
  } else {
    const { eventName } = req.body

    await User.find({username: req.params.name}).then((user) => {
        console.log(user)
        try {
            const updated = {
                ...user._doc,
                joinedEvents: (user.joinedEvents || []).concat(eventName),
            }

            User.findOneAndUpdate({ username: req.params.name }, updated, {
                new: true,
              })
                .then((updatedUser) => {
                  res.json(updatedUser);
                })
                .catch((error) => next(error));
        } catch (error) {
            next(error);
        }
        
    })
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).lean();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser, signUpUser, updateUser, getUsers };
