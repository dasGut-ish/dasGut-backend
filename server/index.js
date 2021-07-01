'use strict';

const io = require('socket.io');
const faker = require('faker');

const PORT = process.env.PORT || 3002;
const server = io(PORT);

server.on('connection', (socket) => {
  console.log('client connected: '+socket.id);

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