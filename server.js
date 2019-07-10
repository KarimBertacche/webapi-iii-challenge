const express = require('express');
const postRoute = require('./posts/postRouter');
const userRoute = require('./users/userRouter');

const server = express();

server.use(logger);

server.use('/api/users', userRoute);
server.use('/api/posts', postRoute);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(req.method, 'method');
  console.log(req.url, 'Url');
  console.log(new Date(), 'Timestamp');
  next();
};


module.exports = server;
