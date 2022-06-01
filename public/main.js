const moviesContainer = document.querySelector('#movies-container')
const form = document.querySelector('form')
const themeBtn = document.querySelectorAll('.themes');

const baseURL = `http://localhost:4040/api/movies`

const moviesCallback = ({ data: movies }) => displayMovies(movies)
const errCallback = err => console.log(err.response.data)

const getAllMovies = () => {
    axios
    .get(baseURL)
    .then(moviesCallback)
    .catch(errCallback)
}

const createMovie = body => {
    axios
    .post(baseURL, body)
    .then(moviesCallback)
    .catch(errCallback)}

const deleteMovie = id => {
    axios
    .delete(`${baseURL}/${id}`)
    .then(moviesCallback)
    .catch(errCallback)}


const updateMovie = (id, type) => {
    axios
    .put(`${baseURL}/${id}`, {type})
    .then(moviesCallback)
    .catch(errCallback)}

function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let genre = document.querySelector('#genre')
    let faveChar = document.querySelector('#char')
    let ratings = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        genre: genre.value,
        faveChar:faveChar.value,
        ratings: ratings.value, 
        imageURL: imageURL.value
    }

    createMovie(bodyObj)

    title.value = ''
    genre.value = ''
    faveChar.value = ''
    ratings.checked = false
    imageURL.value = ''
}

function createMovieCard(movie) {
    const movieCard = document.createElement('div')
    movieCard.classList.add('movie-card')

    movieCard.innerHTML = `<img alt='movie cover' src=${movie.imageURL} class="movie-cover"/>
    <p class="movie-title">${movie.title}</p>
    <p class="movie-genre">Genre: ${movie.genre}</p>
    <p class="fave-char">Fave Char: ${movie.faveChar}</p>
    <div class="btns-container">
        <button onclick="updateMovie(${movie.id}, 'minus')">-</button>
        <p class="movie-rating">${movie.ratings} STARS</p>
        <button onclick="updateMovie(${movie.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteMovie(${movie.id})">DELETE</button>
    `


    moviesContainer.appendChild(movieCard)
}

function displayMovies(arr) {
    moviesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createMovieCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)



getAllMovies()

const selectTheme = (evt) => {
    const theme = evt.target.textContent;
    const allBtns = document.querySelectorAll('button');

    document.querySelector('body').className = theme;
    document.querySelector('main').className = theme;
    document.querySelector('header').className = theme;
    

    for (let i = 0; i < allBtns.length; i++) {
        allBtns[i].className = theme;
    }
}

for (let i = 0; i < themeBtn.length; i++) {
     themeBtn[i].addEventListener('click', selectTheme)
}

