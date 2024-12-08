const express = require("express");

const {
  loginUser,
  signUpUser,
  updateUser,
  getUsers,
} = require("../controllers/userController");
const requireAuth = require('../middleware/requireAuth')
const isAdmin = require('../middleware/isAdmin')

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signUpUser);

router.put("/:name", updateUser);

router.get("/", requireAuth, isAdmin, getUsers);

module.exports = router;
