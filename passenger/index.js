'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3002');
const dateTime = new Date();

socket.on('connection', () => {
  console.log('connected to server');
})