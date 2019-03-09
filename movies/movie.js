const axios = require('axios');
const cheerio = require('cheerio');
var express = require('express');
var request = require('request');
var app = express();
const movies = [];

exports.movies = function (url) {

    axios(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            // const film = $('.col-xs-10 content');

            const link = $(this).find('.vjs-poster').text();

            // films.each(function () {
            //     const title = $(this).find('.caption').text();
            //     const link = $(this).find('figure > a').attr('href');
            //     const image = $(this).find('figure > a > img').attr('src');
            //     const quality = $(this).find('.quality-top').text();
            //     const rating = $(this).find('.rating').text();
            //     const trailer = $(this).find('.item-action > a').attr('href');

            //     movies.push({
            //         title,
            //         image,
            //         quality,
            //         rating,
            //         trailer,
            //         link,
            //     });
            // });
            console.log(link);
        })
        .catch(console.error);

    return movies;
};
