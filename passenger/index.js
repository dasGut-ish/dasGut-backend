'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3002');
const faker = require('faker');
// const dateTime = new Date();

// socket.on('connection', () => {
//   console.log('connected to server');
// });

socket.on('acceptance', (customer) => {
  console.log('Driver has accepted and enroute to your location');
  socket.emit('delivery', customer);
})

socket.on('delivery', () => {
  setTimeout(() => {
    console.log('I have arrived');
    // socket.emit('delivery', customer);
  }, 1000);
})

setInterval(() => {
  const customer = {
    customerName: faker.name.findName(),
    location: faker.address.streetAddress()
  }
  console.log(customer);
  socket.emit('request', customer)
}, 3000);
