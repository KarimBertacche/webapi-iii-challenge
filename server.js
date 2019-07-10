const express = require('express');
// const postRoute = require('./posts/postRouter');
const userRoute = require('./users/userRouter');

const server = express();

server.use('/user', userRoute);
// server.use(postRoute);

server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(req, 'request');
  console.log(req.params, 'request url');
  console.log(new Date(), 'timestamp');
  next();
};

module.exports = server;
