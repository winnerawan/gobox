const axios = require('axios');
const cheerio = require('cheerio');
var express = require('express');
var request = require('request');
const url = 'https://dunia21.me';
var app     = express();
const movies = [];

axios(url)
    .then(response => {
    	const html = response.data;
        const $ = cheerio.load(html);
        const films = $('.row .featured-item > div');

        films.each(function () {
        	const title = $(this).find('.caption').text();
        	const link = $(this).find('figure > a').attr('href');
        	const image = $(this).find('figure > a > img').attr('src');
        	const quality = $(this).find('.quality-top').text();
        	const rating = $(this).find('.rating').text();
        	const trailer = $(this).find('.item-action > a').attr('href');

	        movies.push({
		        title,
		        image,
		        quality,
		        rating,
		        trailer,
		        link,
	        });
        });
        console.log(movies);

    })
.catch(console.error);


var m_url = request.query.url;

console.log(m_url);

app.get('/new_upload', (req, res) => res.send(movies))
app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;