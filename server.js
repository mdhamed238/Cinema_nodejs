const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const app = express();
require('./production')(app)

const port = process.env.PORT || 5000

connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/movies', require('./routes/movieRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler);

app.listen(port, () => console.log("Server started at http://localhost:" + port));
