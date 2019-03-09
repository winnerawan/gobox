var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
const req = require("tinyreq");
const cheerioReq = require("cheerio-req");

// Define the scrape function
function scrape(url, data, cb) {
    // 1. Create the request
    req(url, (err, body) => {
        if (err) { return cb(err); }

        // 2. Parse the HTML
        let $ = cheerio.load(body)
          , pageData = {}
          ;

        // 3. Extract the data
        Object.keys(data).forEach(k => {
            pageData[k] = $(data[k]).text();
        });

        // Send the data in the callback
        cb(null, pageData);
    });
}

// Extract some data from my website
scrape("https://dunia21.me/master-z-ip-man-legacy-ye-wen-wai-zhuan-zhang-tian-zhi-2018/", {
    // Get the website title (from the top header)
    title: ".last span",
    //judul: title.replace("POPUP", ""),
    //title: title.replace("DOWNLOAD FILM", "")
    //title: atitle.replace("DOWNLOAD FILM", "")
    // ...and the description
    link: '.vjs-poster',
    description: "blockquote"
}, (err, data) => {
    console.log(err || data);
});

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;