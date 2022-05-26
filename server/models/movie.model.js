const mongoose = require('mongoose')

const MovieSchema = mongoose.Schema({
    ComingSoon: {
        type: Boolean
    },
    Title: {
        type: String,
        required: [true, "Please add a title"]
    },
    Year: {
        type: String
    },
    Rated: {
        type: String
    },
    Released: {
        type: String
    },
    Runtime: {
        type: String
    },
    Genre: {
        type: String
    },
    Director: {
        type: String
    },
    Writer: {
        type: String
    },
    Actors: {
        type: String
    },
    Plot: {
        type: String
    },
    Language: {
        type: String
    },
    Country: {
        type: String
    },
    Awards: {
        type: String
    },
    Poster: {
        type: String
    },
    Metascore: {
        type: String
    },
    imdbRating: {
        type: String
    },
    imdbVotes: {
        type: String
    },
    imdbID: {
        type: String
    },
    Type: {
        type: String
    },
    response: {
        type: String
    },
    Images: {
        type: [String]
    }
})

const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie