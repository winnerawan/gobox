const axios = require('axios');
const cheerio = require('cheerio');
var express = require('express');
var request = require('request');
const req = require("tinyreq");
var app = express();
const movie = {};
const movies = [];
var details = [];
var data = [];
var pageData = {};
axios('https://dunia21.me/master-z-ip-man-legacy-ye-wen-wai-zhuan-zhang-tian-zhi-2018/')
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            const dd = $('.content');
            // console.log($.html());
            var synopsis = dd.find('blockquote').html();
            var down_link = $('.download-movie > a').attr('href')

            axios(down_link)
                .then(response => {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    console.log(html);    
                });
            var link = $('#player > iframe').html();

            console.log(down_link);

            var text = $('.content div h3 > a').contents().map(function () {
                quality = $(this[1]).text().trim();

                if (this.type === 'text')
                    return $(this).text().trim()
            }).get()


            movie['quality'] = text[0];
            movie['country'] = text[1] + ', ' + text[2];
            movie['stars'] = text[3] + ', ' + text[4] + ', ' + text[5] + ', ' + text[6];
            movie['director'] = text[7];
            movie['genre'] = text[8];
            movie['synopsis'] = synopsis.replace('<strong>Synopsis</strong><br>', '');
            movie['link'] = link;

            console.log(movie);

        })
.catch(console.error);

