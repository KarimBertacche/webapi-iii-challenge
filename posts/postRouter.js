const express = require('express');
const data = require('./postDb');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await data.get();
        res.status(200).json({
            posts
        });
    } catch(error) {
        res.status(500).json({
            message: 'Server error retrieving the posts'
        });
    }
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;