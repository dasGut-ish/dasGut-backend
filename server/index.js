'use strict';

const { Server } = require('socket.io');
const faker = require('faker');
require('dotenv').config();
// const express = require('express');
// const app = express();

const PORT = process.env.PORT || 3002;
console.log(process.env.PORT);
const server = new Server(PORT, {
  cors:
    { origin: ['http://localhost:3000'], methods: ['GET'] }
});

server.on('connection', (socket) => {
  console.log('client connected: ' + socket.id);

  socket.on('request', (customer) => {
    console.log('Customer has requested a pickup');
    server.emit('request', customer);
  })

  socket.on('acceptance', (customer) => {
    console.log('Driver accepted and is enroute');
    server.emit('acceptance', customer);
  })

  socket.on('delivery', (customer) => {
    console.log('Passenger has been delivered to their destination');
    server.emit('delivery', customer);
  })

});

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));