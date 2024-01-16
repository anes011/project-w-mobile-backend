const http = require('http');
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

// imported routes
const users = require('./routes/users');
const offer = require('./routes/offer');
const reservation = require('./routes/reservation');
const acceptedReservation = require('./routes/acceptedReservation');


// Database connection config:
mongoose.connect('mongodb://localhost:27017/project-w-mobile-backend');

const db = mongoose.connection;

db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Database is up nd running :)!'));
// end of database connection config

app.use(cors());
app.use(express.json());


// Activating routes
app.use('/users', users);
app.use('/offer', offer);
app.use('/reserve', reservation);
app.use('/accepted', acceptedReservation);

const server = http.createServer(app);

server.listen(port);

// Socket.io config:
const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('reserve', (msg) => {
        socket.broadcast.emit('receivedRes', msg);
    });

    socket.on('accept', (msg) => {
        socket.broadcast.emit('accepted', msg);
    });
});