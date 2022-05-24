require('dotenv').config()

console.log('====================================');
console.log(process.env.JWT_SECRET);
console.log('====================================');


const films = require('./film.json')
// const Films = films.filter(film => {
//     return JSON.parse(film)
// })

require('./models/movie.model').insertMany(films)