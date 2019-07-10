// code away!
const express = require('express');
const postRoute = require('./posts/postRouter');

const server = express();

server.use(postRoute);

server.listen(4000, () => {
    console.log('** Server running on port 4K **');
});