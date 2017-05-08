import { data } from 'data';

var search = function () {
    var $thumbs = $('<div class="thumbs container"></div>');
    var $search = $('<input>').attr('type', 'text').addClass('search').addClass('form-control');

    $('#content')
        .html('')
        .append($search)
        .append($thumbs);

    $('.search').focus();

    $('.search').on('keyup', function (e) {
        $thumbs.children().remove();

        var searchFor = e.target.value;
        if (!searchFor) {
            return;
        }

        Promise.all([data.getMovies(searchFor), data.getTemplate('movies')])
            .then(([movies, template]) => {
                $thumbs.html(template({
                    movies: movies
                }));
            })
    });

    $thumbs.on('click', '.add-movie', function (e) {
        const id = $(e.target).data('id');
        const user = localStorage.getItem('username');
        const passHash = localStorage.getItem('passHash');
        const userLogged = user && passHash;

        if (!userLogged) {
            alert('You must be logged in in order to add a movie!');
            return;
        }

        $.post('/add-movie', {
            username: user,
            passHash: passHash,
            movieID: id
        }, function (data) {
            console.log(data);
        })

    })
}

export { search };