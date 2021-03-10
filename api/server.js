const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const {logger} = require('./middleware/middleware')

const server = express();

const usersRouter = require('./users/users-router')

// remember express by default cannot parse JSON in request bodies
server.use(express.json())

// global middlewares
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())

// global middlewares and the user's router need to be connected here
server.use('/api/users', usersRouter)

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message, // DEV
    stack: err.stack, // DEV
    custom: 'something went terrible in general', // PRODUCTION
  })
})

module.exports = server;
