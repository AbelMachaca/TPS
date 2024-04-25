const db = require('../../database/models');
const sequelize = db.sequelize;

const genresController = {
    list: (req, res) => {
        db.Genre.findAll()
        .then(genres => {
            const response = {
                meta: {
                    status: 200,
                    total: genres.length,
                    url: "/genres",
                },
                data: genres
            }
            res.json(response);
        })
    },
    detail: (req, res) => {
        db.Genre.findByPk(req.params.id)
        .then(genre => {
    const response = {
        meta: {
            status: 200,
            total: genre.length,
            url: "/genres/detail/:id",
        },
        data: genre
    }
    res.json(response);       
        })
    },
}

module.exports = genresController;