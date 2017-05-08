const fs = require('fs');

var getMovies = function (req, res) {
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

    if (!user.movies.length) {
        res.send('Your watchlist is empty');
        return;
    }

    res.send(user.movies);
};
module.exports = getMovies;