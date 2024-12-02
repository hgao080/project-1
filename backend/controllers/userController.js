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

        res.status(200).json({
            username: user.username,
            email: user.email,
            token
        })
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

        res.status(200).json({username, token})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

const updateUser = async (req, res, next) => {
    const { username } = req.body

    await User.findById(req.params.id).then(user => {
        const updated = {
            ...user._doc,
            username: username
        }

        User.findByIdAndUpdate(req.params.id, updated, {new: true})
            .then(updatedUser => {
                res.json(updatedUser)
            })
            .catch(error => next(error))
    })
}

module.exports = {loginUser, signUpUser, updateUser}