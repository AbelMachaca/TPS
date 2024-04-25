const db = require('../database/models');
const sequelize = db.sequelize;

const moviesController = {

    actMovies: (req, res) => {
        res.render("formulario");
    },

    crearMovie: (req, res) => {
        res.render("formulario");
    },

    favMovies: (req, res) => {
        res.render("favoritas");
    },
};

module.exports = moviesController;