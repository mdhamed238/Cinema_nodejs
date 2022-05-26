const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    favoriteMovies: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    }
},
    {
        timestamps: true,
    }
)


const User = mongoose.model('User', userSchema)

module.exports = User