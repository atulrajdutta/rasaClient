require('dotenv').config();
const express = require('express');
var ip = require('ip');
var app = require('express')();
var http = require('http').createServer(app);
var cors = require('cors');

const registerRoutes = require('./routes')

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
app.use(express.json());

registerRoutes(app);
http.listen(process.env.http_port, function () {
    console.log(`Server running on ${process.env.http_port}`);
    console.log(`http://${ip.address()}:${process.env.http_port}`);
});
module.exports = app;
