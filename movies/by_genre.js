const axios = require('axios');
const cheerio = require('cheerio');
var express = require('express');
var request = require('request');
var app = express();
const movies = [];

// var genre = request.params;
// var url = '';


exports.movies = function (url) {

    switch (url) {
        case 'action':
            url = 'https://dunia21.me/genre/action/';
            break;
        case 'adventure':
            url = 'https://dunia21.me/genre/adventure/';
            break;
        case 'animation':
            url = 'https://dunia21.me/genre/animation/';
            break;
    }
    console.log(url);


    axios(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const films = $('.row .row .featured-item > div');

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

        })
        .catch(console.error);

    return movies;
};
