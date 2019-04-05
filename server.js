const express = require('express');
const server = express();
const register = require('./register.js');
const login = require('./login.js');
const addMovie = require('./add-movie.js');
const removeMovie = require('./remove-movie.js');
const getMovies = require('./get-movies.js');
const bodyParser = require("body-parser");

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(express.static('public'));
server.use('/scripts/node_modules', express.static('node_modules'));

server.post('/register', register);
server.post('/login', login);
server.post('/add-movie', addMovie);
server.post('/remove-movie', removeMovie);
server.post('/watchlist', getMovies);

server.listen(80, () => {
    console.log('Server running...');
});