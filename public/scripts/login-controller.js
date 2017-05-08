import { data } from 'data';

var login = function (context) {
    data.getTemplate('login').then(function (templ) {
        $('#content').html(templ());
        $('#login-form').on('submit', function (e) {
            e.preventDefault();
            const username = $('#input-username').val();
            const pass = $('#input-password').val();
            const hashPass = CryptoJS.SHA256(pass).toString();
            $.post('/login', {
                username: username,
                password: hashPass
            }, function (data, status) {
                alert(data);
                if (data.indexOf('Successfully') > -1) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('passHash', hashPass);
                    context.redirect('#home');
                }
            })
        });
    })
}
export { login };