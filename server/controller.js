const movies = require('./db.json');

let globalID = 11; //11 BC ARRAY ENDED AT 10

module.exports = {
    getMovies: (req, res) => {
        res.status(200).send(movies);
    },
    deleteMovie: (req, res) => {
        let index = movies.findIndex((elem) => elem.id === +req.params.id);
        movies.splice(index, 1);
        // console.log(movies);
        res.status(200).send(movies);
    },
    createMovies: (req,res) => {
        // console.log("HITTA")
        let {title,genre, faveChar,ratings,imageURL} = req.body;
        // console.log(title, rating, imageURL)
        let newMovie = {
            id: globalID,
            title: title,
            genre: genre,
            faveChar: faveChar,
            ratings: ratings,
            imageURL: imageURL
        };
        movies.push(newMovie);
        globalID++;
        res.status(200).send(movies);
    },
    updateMovie: (req,res) => {
        // console.log(req.params, req.body, req.query);
        let {id} = req.params;
        let {type} = req.body;
        
        let index = movies.findIndex(elem => Number(elem.id) === Number(id))

        if (movies[index].ratings === 5 && type === 'plus') {
            res.status(400).send('cannot go above 5')
        } else if (movies[index].ratings === 0 && type === 'minus') {
            res.status(400).send('cannot go below 0')
        } else if (type === 'plus') {
            movies[index].ratings++
            res.status(200).send(movies)
        } else if (type === 'minus') {
            movies[index].ratings--
            res.status(200).send(movies)
        } else {
            res.sendStatus(400)
        }
    }
};