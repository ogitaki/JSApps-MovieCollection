function getIds(keyWord) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://www.omdbapi.com/?s=' + keyWord,
            success: function (response) {
                if (!response.Search) {
                    reject();
                    return;
                }
                var ids = response.Search.filter(x => x.Poster != 'N/A').map(x => x.imdbID);
                resolve(ids);
            },
            error: reject
        });
    });
}

function processResponse(ids) {
    return ids.map(function (id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://www.omdbapi.com/?i=" + id,
                success: resolve,
                error: reject,
            });
        });
    });
}

var lastResp;

var data = {
    getMoviesById: function (ids) {
        if (!(ids instanceof Array)) {
            return;
        }
        return new Promise((resolve, reject) => {
            Promise.all(processResponse(ids)).then(resolve);
        })
    },
    getMovies: function (keyWord) {
        return new Promise((resolve, reject) => {
            var movies;
            getIds(keyWord).then(function (ids) {
                Promise.all(processResponse(ids)).then(function (resp) {
                    lastResp = resp;
                    resolve(resp);
                })
            }, function () {
                resolve(lastResp);
            })
        })
    },
    getTemplate: function (name) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: './templates/' + name + '.html',
                success: function (data) {
                    var templ = Handlebars.compile(data);
                    resolve(templ);
                },
                error: reject,
            });
        })
    }

}

export { data };