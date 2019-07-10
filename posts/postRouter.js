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

router.get('/:id', validatePostId, async (req, res) => {
    res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, async (req, res) => {
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

router.put('/:id', validatePostId, async (req, res) => {
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

async function validatePostId(req, res, next) {
    try {
        const { id } = req.params;
        const postId = await data.getById(id);
        if(!isNaN(parseInt(id))) {
            if(postId) {
                req.post = postId;
                next();
            } else {
                res.status(404).json({
                    message: 'The post Id used does not exist'
                });
            }
        } else {
            res.status(404).json({
                message: 'The post Id used is not a valid number'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving post Id'
        });
    }
};

module.exports = router;