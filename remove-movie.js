const fs = require('fs');

var removeMovie = function (req, res) {
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

    var movie = user.movies.find(x => x === movieID);

    if (!movie) {
        res.send('Movie missing from watchlist, try again.');
        return;
    }


    user.movies.splice(user.movies.indexOf(movieID), 1);
    fs.writeFileSync('./users/' + username + '.json', JSON.stringify(user));
    res.send('Movie removed');
}
module.exports = removeMovie;