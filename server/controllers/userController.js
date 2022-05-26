require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const Movie = require('../models/movie.model')

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        res.json({ success: false, msg: "User already exists" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            },
            success: true,
            msg: "User registred successfully"
        })
    } else {
        res.status(400)
        res.json({ success: false, msg: 'Invalid user data' })
    }
})

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            },
            empty: false,
            msg: "Login successful"
        })
    } else {
        res.status(400)
        res.json({
            empty: true,
            msg: 'Invalid credentials'
        })
    }
})

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email, favoriteMovies } = await User.findById(req.user.id)
    res.status(200).send({
        id: _id,
        name,
        email,
        favoriteMovies
    })
})


// @desc Add movie to favorites list
// @route POST /api/users/addFavorite
// @access Private

const toggleFavorite = asyncHandler(async (req, res) => {
    const movieId = req.body.id
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(400).json({ success: false, msg: 'User not found' })
        return
    }

    else if (!movieId) {
        res.status(400).json({ success: false, msg: 'Movie not found' })
        return
    }

    const favorites = user.favoriteMovies
    const index = favorites.indexOf(movieId)
    if (index > -1) {
        favorites.splice(index, 1)
    } else {
        favorites.push(movieId)
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, { favoriteMovies: favorites }, { new: true })

    res.status(201).json({ user: updatedUser })
})



const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
    toggleFavorite
}