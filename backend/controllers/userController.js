const User = require('../models/userModel')

// login user
const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})
}

// signup user
const signUpUser = async (req, res) => {
    const { email, password, username } = req.body

    try {
        const user = await User.signUp(email, password, username)

        res.status(200).json(user)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {loginUser, signUpUser}