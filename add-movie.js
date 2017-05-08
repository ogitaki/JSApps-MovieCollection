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

    user.movies.push(movieID);
    console.log(user);
    console.log(movieID);
    fs.writeFileSync('./users/' + username + '.json', JSON.stringify(user));
}
module.exports = addMovie;