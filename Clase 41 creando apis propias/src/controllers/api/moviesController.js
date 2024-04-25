const db = require('../../database/models');

const moviesController = {
    list: (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                const response = {
                    meta: {
                        status: 200,
                        total: movies.length,
                        url: "/movies",
                    },
                    data: movies
                };
                res.json(response);
            })
            .catch(error => {
                console.log("error", error);
            });
    },
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                if (movie) {
                    const response = {
                        meta: {
                            status: 200,
                            total: 1,
                            url: `/movies/detail/${req.params.id}`,
                        },
                        data: movie
                    };
                    res.json(response);
                }
            })
            .catch(error => {
                console.log("error", error);
            });
    },
    create: (req, res) => {
        console.log("Datos recibidos en la solicitud:", req.body);
        db.Movie.create(req.body)
            .then(movie => {
                return res.status(200).json({
                    data: movie,
                    status: 200,
                    created: 'ok'
                });
            })
            .catch(error => {
                console.log("error", error);
            });
    },
    delete: (req, res) => {
        db.Movie.destroy({
            where: { id: req.params.id }
        })
            .then(response => {
                if (response === 1) {
                    res.json({ message: "Se elimino la pelicula" });
                } else {
                    res.json({ error: "No se encontro la pelicula" });
                }
            })
            .catch(error => {
                console.log("error", error);
            });
    },
    update: (req, res) => {
        db.Movie.update(req.body, {
            where: { id: req.params.id }
        })
            .then(([updatedMovie]) => {
                if (updatedMovie === 1) {
                    res.json({ message: "Se actualizo la pelicula" });
                } else {
                    res.json({ error: "No se encontro la pelicula" });
                }
            })
            .catch(error => {
                console.log("error", error);
            });
    }
};

module.exports = moviesController;
