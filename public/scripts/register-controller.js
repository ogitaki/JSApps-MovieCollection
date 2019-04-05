import { data } from 'data';

var register = function (context) {
    data.getTemplate('register').then(function (templ) {
        $('#content').html(templ());
        $('#register-form').on('submit', function (e) {
            e.preventDefault();
            const username = $('#input-username').val();
            const pass = $('#input-password').val();
            const passHash = CryptoJS.SHA256(pass).toString();
            const confPass = $('#input-password-repeat').val();
            const confPassHash = CryptoJS.SHA256(confPass).toString();
            $.post('/register', {
                username: username,
                passHash: passHash,
                confPassHash: confPassHash
            }, function (data, status) {
                alert(data);
                if (data.indexOf('Successfully') > -1) {
                    context.redirect('#home');
                }
            })
        });
    })
}
export { register };