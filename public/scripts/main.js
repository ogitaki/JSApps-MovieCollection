import { search } from 'search';
import { register } from 'register';
import { login } from 'login';
import { watchlist } from 'watchlist';

new Sammy(function () {
    this.before(function (context) {
        const userLogged = localStorage.getItem('username') && localStorage.getItem('passHash');
        if (userLogged) {
            $('.visible-when-logged-out').addClass('hidden');
            $('.visible-when-logged').removeClass('hidden');
            $('#username-display a').html(localStorage.getItem('username'));
        }
        else {
            $('.visible-when-logged-out').removeClass('hidden');
            $('.visible-when-logged').addClass('hidden');
        }

        $('#btn-logout a').on('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('username');
            localStorage.removeItem('passHash');
            context.redirect('#home');
        })
    })
    this.get('/', search);
    this.get('#home', search);
    this.get('#login', login);
    this.get('#register', register);
    this.get('#watchlist', watchlist);
    this.post('', function () {
        //Fix sammy errors
    });
}).run();

