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
    setTimeout(function(){
      server.emit('ready', customer);
    }, 1000);
  })


  socket.on('route', (route) => {
    
      console.log(route);
      server.emit('coming', route);

      setTimeout(function(){
        console.log('lets go');
        const go = "Driver is here let's go!"
        server.emit('letsGo', go);
  
      }, 3000)

   
  })

  socket.on('go', (customer) => {
    setTimeout(function(){
      const customerTip = `${customer} Says, Thanks for the ride here is a tip`

      console.log('Thanks for the ride, here is a tip');
      server.emit('tip', customerTip);

    }, 4000)
  })

  socket.on('tip', (star) => {
    console.log('Driver rates you five stars');
    server.emit('star', star);
  })


});

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));