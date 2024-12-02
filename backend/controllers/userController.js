require('dotenv').config()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, { expiresIn: '3d'})
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        const token = createToken(user.id)

        res.status(200).json({token})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// signup user
const signUpUser = async (req, res) => {
    const { email, password, username } = req.body

    try {
        const user = await User.signUp(email, password, username)

        const token = createToken(user.id)

        res.status(200).json({token})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {loginUser, signUpUser}