const mongoose = require('mongoose');
require('dotenv').config();

// Database
const options = {
  useNewUrlParser: true,
  keepAlive: true
};
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DATABASE, options);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connection open to ${process.env.DATABASE}`);
  // Here we send the ready signal to PM2
  if (process.send) {
    process.send('ready');
  }
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});
