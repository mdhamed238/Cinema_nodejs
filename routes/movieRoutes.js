const express = require('express')
const router = express.Router()
const {
    getMovies,
    setMovie,
    setMovies,
    updateMovie,
    deleteMovie
} = require('../controllers/movieController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getMovies).post(protect, setMovie)
router.route('/many').post(protect, setMovies)
router.route('/:id').delete(protect, deleteMovie).put(protect, updateMovie)

module.exports = router;