'use strict';

const io = require('socket.io');
const faker = require('faker');

const PORT = process.env.PORT || 3002;
const server = io(PORT);

server.on('connection', (socket) => {
  console.log('client connected: '+socket.id);

  
});