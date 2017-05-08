const fs = require('fs');

var addMovie = function (req, res) {
    const username = req.body.username;
    const passwordHash = req.body.passHash;

    const exists = fs.existsSync('./users/' + username + '.json');
    if (!exists) {
        res.send('User doesn\'t exist');
        return;
    }

    const user = JSON.parse(fs.readFileSync('./users/' + username + '.json'));

    const match = user.username === username && user.passwordHash === passwordHash;

    if (!match) {
        res.send('An error occured');
        return;
    }

    const movieID = req.body.movieID;

    if (user.movies.find(x => x === movieID)) {
        res.send('Movie already in watchlist');
        return;
    }

    user.movies.push(movieID);
    fs.writeFileSync('./users/' + username + '.json', JSON.stringify(user));
    res.send('Movie added to watchlist');
}
module.exports = addMovie;