const APIKEY = '272651da9bad0f5272973655ca6b1e8b';
const APIURL = 'https://api.themoviedb.org/3/discover/movie?api_key=272651da9bad0f5272973655ca6b1e8b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=272651da9bad0f5272973655ca6b1e8b&query=';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    showMovies(respData.results);
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

function showMovies(movies) {
    main.innerHTML = "";

    movies.forEach(movie => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieE1 = document.createElement('div');
        movieE1.classList.add('movie');

        movieE1.innerHTML = `
        <img src="${IMGPATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h4>${title}</h4>
            <span class = "${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class = "overview">
            <h4>Overview:</h4>
            ${overview}
        </div>
        `;
        main.appendChild(movieE1);
    })

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = '';
    }
})