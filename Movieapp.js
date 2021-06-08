var API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
var IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
var SEARCH_API = 'https://api.themoviedb.org/3/search/movie?aoi_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
var main = document.getElementById('main')

var form = document.getElementById('form')
var search = document.getElementById('search')
getMovies(API_URL)


async function getMovies(url){
    var res = await fetch(url)
    var data = await res.json()

    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML = ''

    movies.forEach((movie) => {
        var { title, poster_path, vote_average, overview} = movie

        var movieEL = document.createElement('div')
        movieEL.classList.add('movie')

        movieEL.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
             ${overview}
        </div>
        `

        main.appendChild(movieEL)


    })
}
function getClassByRate(vote){
    if(vote >= 8){
        return 'green'
    }
    else if(vote >= 5){
        return 'orange'
    }
    else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    var searchTerm = search.nodeValue

    if(searchTerm && searchTerm !== '')
    {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    }
    else{
        window.localion.reload()
    }
})