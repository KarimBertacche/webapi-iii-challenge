const express = require('express');
const data = require('./postDb');

const router = express.Router();

router.use(express.json());

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

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await data.getById(id);
        
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: 'Post not found'
            });
        }
        
    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving post'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await data.remove(id);

        if(deleted) {
            res.status(204).end();
        } else {
            res.status(400).json({
                message: 'Post with specified Id not found'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while deleting post'
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const updatedPost = await data.update(id, req.body);

        if(changes.text !== '') {
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({
                message: 'Text is missing'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while updating post'
        });
    }
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;