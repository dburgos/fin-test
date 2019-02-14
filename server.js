// Dependencies
require('./server/database');
const bodyParser = require('body-parser');
const compress = require('compression');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const methodOverride = require('method-override');
const morgan = require('morgan');
const app = express();

// Configuration
app.set('trust proxy', true);
app.set('port', process.env.PORT);
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(compress());
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(methodOverride());

// Router
require('./server/router')(app);

// Startup
const server = app.listen(app.get('port'), () => {
  console.info('NodeJS server running on %s', app.get('port'));
});

// Note when shutdown
process.on('SIGINT', () => {
  console.log('NodeJS server closed');
  server.close();
});

module.exports = server;