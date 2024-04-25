const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: (req, res) => {
        Genres.findAll()
        .then(allGenres => {
            res.render('moviesAdd', { title: 'New Movie', allGenres });
        })
        .catch(err => {
            console.log(err)
        });
    },
    create: (req, res) => {
        const {title, rating, awards, release_date, length, genre_id} = req.body;

        Movies.create({
            title,
            rating,
            awards,
            release_date,
            length,
            genre_id
        })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => {
            console.log(err)
        })
    },
    edit: (req, res) => {
        const { id } = req.params;

        Promise.all([
            db.Movie.findByPk(id),
            db.Genre.findAll()
        ])
        .then(([movie, allGenres]) => {
            res.render('moviesEdit', {title: 'Edit Movie', movie, allGenres });
        })
        .catch(err => {
            console.log(err);
        });
    },
    update: (req, res) => {
        const {id} = req.params;
        const {title, rating, awards, release_date, length, genre_id} = req.body;

        Movies.update({
            title,
            rating,
            awards,
            release_date,
            length,
            genre_id
        },
        {
            where: {
                id: id
            }
        }
        )
        .then(() => {
            res.redirect(`/movies/detail/${id}`);
        })
        .catch(err => {
            console.log(err)
        })
    },
    delete: function (req, res) {
        const {id} = req.params

        Movies.findByPk(id)
        .then(movie =>{
            res.render('moviesDelete', {movie: movie})
        })
        .catch(err=>{
            console.log(err)
        })
    },
    destroy: function (req, res) {
        const {id} = req.params

        Movies.destroy({
            where: {
                id: id
            }
        })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

module.exports = moviesController;