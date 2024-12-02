require('dotenv').config()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, { expiresIn: '3d'})
}

// login user
const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})
}

// signup user
const signUpUser = async (req, res) => {
    const { email, password, username } = req.body

    try {
        const user = await User.signUp(email, password, username)

        const token = createToken(user.id)

        res.status(200).json(token)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {loginUser, signUpUser}