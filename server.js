//todo: 
// - create a namespace
// - limit max number of connections
// - convert drawing to data URI and email with nodemailer?

//native modules
const path = require('path');
const http = require("http");

//third-party modules
const express = require('express');

//routes
const index = require('./routes/index');

// app setup
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use('/', index);
app.use(express.static(path.join(__dirname, 'public')));

//Socket.io configuration
var server = require('http').Server(app); //Create a new HTTP Server
var io = require('socket.io')(server); //Use that server to run Socket.io
const PORT = process.env.PORT || 8080; //Set the port
server.listen(PORT); //Listen for activity


io.on('connection', function(socket) {
    socket.emit('message', { message: 'Server to client: user connected' });
    socket.on('message', function(data) {
        console.log(data.message)
    })
    socket.on('chat message', function(data) {
        io.emit('chat message', data)
    })
});

server.on('disconnect', function() {
    console.log('user disconnected');
});
// server -> emit an event to client -> client recieves the event -> emit event back to server

module.exports = {
    app
}