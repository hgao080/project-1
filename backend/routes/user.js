const express = require("express");

const {
  loginUser,
  signUpUser,
  updateUser,
  getUsers,
} = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signUpUser);

router.put("/:name", updateUser);

router.get("/", getUsers);

module.exports = router;
