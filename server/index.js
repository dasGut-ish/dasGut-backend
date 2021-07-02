'use strict';

const { Server } = require('socket.io');
require('dotenv').config();


const PORT = process.env.PORT || 3002;
console.log(process.env.PORT);

// ------- to stop React.js from throwing cors error ---------//
const server = new Server(PORT, {
  cors:
    { origin: ['http://localhost:3000'], methods: ['GET'] }
});


// ------- Client connections ---------//
server.on('connection', (socket) => {
  console.log('client connected: ' + socket.id);

  // ---------------Rider is ready for pick up --------------//
  socket.on('request', (customer) => {
    console.log('Customer has requested a pickup');
    setTimeout(function(){
      server.emit('ready', customer);
    }, 1000);
  })

  // ---------------Driver is in route --------------// 
  socket.on('route', (route) => {
    
      console.log(route);
      server.emit('coming', route);

      setTimeout(function(){
        console.log('lets go');
        const go = "🚙 Driver is here let's go!"
        server.emit('letsGo', go);
  
      }, 3000)
  })

  // ---------------Rider says lets go and sends tip after ride --------------// 
  socket.on('go', (customer) => {
    setTimeout(function(){
      const customerTip = `${customer} Says, Thanks for the ride: here is a tip 💰 `
      console.log('Thanks for the ride, here is a tip');
      server.emit('tip', customerTip);

    }, 4000)
  })
  // ---------------Driver Rates Five Star --------------// 
  socket.on('tip', (star) => {
    console.log('Driver rates you five stars');
    server.emit('star', star);
  })

});

