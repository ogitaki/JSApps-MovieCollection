import { data } from 'data';

var watchlist = function (context) {
    var $thumbs = $('<div class="thumbs container"></div>');

    $('#content')
        .html('')
        .append($thumbs);

    const user = localStorage.getItem('username');
    const passHash = localStorage.getItem('passHash');
    const userLogged = user && passHash;

    $.post('/watchlist', {
        username: user,
        passHash: passHash,
    }, function (returnData) {
        if (typeof returnData === 'string') {
            var msg = $('<p class="error-message">');
            msg.append(returnData);
            $thumbs.append(msg);
            return;
        }
        Promise.all([data.getMoviesById(returnData), data.getTemplate('watchlist')])
            .then(([movies, template]) => {
                $thumbs.html(template({
                    movies: movies
                }));
            });
    })

    $thumbs.on('click', '.remove-movie', function (e) {
        const id = $(e.target).data('id');
        const user = localStorage.getItem('username');
        const passHash = localStorage.getItem('passHash');
        var element = $(this).parent('.thumb');

        $.post('/remove-movie', {
            username: user,
            passHash: passHash,
            movieID: id
        }, function (returnData) {
            alert(returnData);
            if (returnData.indexOf('Movie removed') < 0) {
                return;
            }
            element.remove();
        })
    });
}

export { watchlist };