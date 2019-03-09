var express = require('express');
var new_upload = require('./movies/new_upload');
var recommendation = require('./movies/recommendation');
var popular = require('./movies/popular');
var genre = require('./movies/by_genre');
var movie = require('./movies/movie');

var app = express();

app.get('/new_upload', (req, res) => res.send(new_upload.movies()))
app.get('/recommendations', (req, res) => res.send(recommendation.movies()))
app.get('/popular', (req, res) => res.send(popular.movies()))
app.get('/:genre/movies', (req, res) => res.send(genre.movies(req.params.genre)))
app.get('/movie', (req, res) => res.send(movie.detail(req.query.url)))

app.listen('8081')