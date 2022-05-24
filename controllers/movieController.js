const asyncHandler = require('express-async-handler')
const Movie = require('../models/movie.model')
const User = require('../models/user.model')

// @desc Get movies
// @route GET /api/movies
// @access Private
const getMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find({ user: req.user.id })

    res.status(200).json(movies)
})

// @desc Set movie
// @route POST /api/movies
// @access Private
const setMovie = asyncHandler(async (req, res) => {
    if (!req.body.Title) {
        res.status(400)
        throw new Error('Please add a title field')
    }

    const {
        user,
        Title,
        Year,
        Rated,
        Released,
        Runtime,
        Genre,
        Director,
        Writer,
        Actors,
        Plot,
        Language,
        Country,
        Awards,
        Poster,
        Metascore,
        imdbRating,
        imdbVotes,
        imdbID,
        Type,
        response,
        Images
    } = req.body

    const movie = await Movie.create({
        user,
        Title,
        Year,
        Rated,
        Released,
        Runtime,
        Genre,
        Director,
        Writer,
        Actors,
        Plot,
        Language,
        Country,
        Awards,
        Poster,
        Metascore,
        imdbRating,
        imdbVotes,
        imdbID,
        Type,
        response,
        Images
    })

    res.status(200).json(movie)
})



const setMovies = asyncHandler(async (req, res) => {
    if (!req.body.some(m => m.Title)) {
        res.status(400)
        throw new Error('Please add a title field')
    }



    const movie = await Movie.create(req.body)


    res.status(200).json(movie)
})





// @desc Update movie
// @route PUT /api/movies/:id
// @access Private
const updateMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(400)
        throw new Error('movie not found');
    }

    const user = await User.findById(req.user.id);

    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the movie user
    if (movie.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedMovie = await movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedMovie);
})

// @desc Delete movie
// @route DELETE /api/movies/:id
// @access Private
const deleteMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(400)
        throw new Error('movie not found');
    }

    const user = await User.findById(req.user.id);

    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the movie user
    if (movie.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }


    await movie.remove();
    res.status(200).json({ id: req.params.id })
});



module.exports = {
    getMovies,
    setMovie,
    setMovies,
    updateMovie,
    deleteMovie
}