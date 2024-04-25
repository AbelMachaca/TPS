const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

router.get("/movies/create", moviesController.crearMovie);
router.get("/movies/update/:id", moviesController.actMovies);
router.get('/movies/favorite', moviesController.favMovies);

module.exports = router;
