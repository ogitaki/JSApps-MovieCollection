const fs = require('fs');

var register = function (req, res) {
    const username = req.body.username;
    const passwordHash = req.body.passHash;
    const confirmedPasswordHash = req.body.confPassHash;

    if (!(/^[a-zA-Z0-9]{3,13}$/.test(username))) {
        res.send('Invalid username');
        return;
    }

    const exists = fs.existsSync('./users/' + username + '.json');

    if (exists) {
        res.send('User already exists');
        return;
    }
    if (passwordHash !== confirmedPasswordHash) {
        res.send('Passwords don\'t match');
        return;
    }

    const folderExists = fs.existsSync('./users/');
    if (!folderExists) {
        fs.mkdirSync('./users');
    }

    fs.writeFileSync('./users/' + username + '.json', JSON.stringify({
        username: username,
        passwordHash: passwordHash,
        movies: []
    }));

    res.send('Successfully registered');
};

module.exports = register;