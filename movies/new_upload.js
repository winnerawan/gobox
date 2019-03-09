const axios = require('axios');
const cheerio = require('cheerio');
var express = require('express');
var request = require('request');
const url = 'https://dunia21.me';
var app = express();
const movies = [];

exports.movies = function () {
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
    
    return movies;
};
