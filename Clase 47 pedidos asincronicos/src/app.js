const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, DELETE");
    res.header('Access-Control-Allow-Headers', "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    next();
}

app.use(allowCrossDomain);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(express.urlencoded({ extended: false }));


const methodOverride = require('method-override');
app.use(methodOverride('_method'));


const indexRoutes = require('./routes/index')
const moviesRoutes = require('./routes/movies')


const apiMoviesRouter = require('./routes/api/movies')
const apiGenresRouter = require('./routes/api/genres')
const apiActorsRouter = require('./routes/api/actors')

app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/', indexRoutes);
app.use(moviesRoutes);


app.use('/api/movies', apiMoviesRouter);
app.use('/api/actors', apiActorsRouter);
app.use('/api/genres', apiGenresRouter);


app.get('/', (req, res) => {
  res.render('home', {});
});


app.listen('3002', () => console.log('Servidor corriendo en el puerto 3002'));