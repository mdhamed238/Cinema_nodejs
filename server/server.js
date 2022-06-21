require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');s
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const app = express();
require('./production')(app);

const port = process.env.PORT || 5000;

connectDB();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.sendFile('c');
});

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// const __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(`${__dirname}/client/build`));
//   app.get("", (req, res) =>
//     res.sendFile(`${__dirname}/client/build/index.html`)
//   );
// }

app.get("/", (req, res) => {
	res.send("APP IS RUNNING")
})

app.use(errorHandler);



app.listen(port, () =>
	console.log('Server started at http://localhost:' + port)
);
