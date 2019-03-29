require('dotenv').config({path: '.env'});
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const route_api = require('./routes/api');
const route_web = require('./routes/web');

const app = express();
const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// app.use(express.static(__dirname + '/node_modules'));

// view engine setup
var cons = require('consolidate');
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/', route_api);
app.use('/', route_web);

app.listen(process.env.SERVER_PORT, () => console.log('server run listening on port '+process.env.SERVER_PORT));
// server.listen(process.env.SERVER_PORT, () => console.log('server run listening on port '+process.env.SERVER_PORT)); //For Socket.io
