const express = require('express');
const data = require('./userDb');
const postData = require('../posts/postDb');

const router = express.Router();

router.use(express.json());

router.post('/', validateUser, async (req, res) => {
    try {
        const { body } = req;
        
        if(body.name !== '') {
            const addedUser = await data.insert(req.body);
            res.status(201).json(addedUser);
        } else {
            res.status(400).json({
                message: 'Name of user is missing'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while creating user'
        });
    }
});

router.post('/:id/posts', [validateUser, validatePost], async (req, res) => {
    try {
        const newPost = { ...req.body, user_id: req.params.id};
        const addedPost = await postData.insert(newPost);
        
        res.status(201).json(addedPost);

    } catch(error) {
        res.status(500).json({
            message: 'Server error while creating user post'
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await data.get();
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({
            message: 'Server error retrieving the user'
        });
    }
});

router.get('/:id', validateUserId, async (req, res) => {
    res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const userPosts = await data.getUserPosts(id);

        if(userPosts.length > 0) {
            res.status(200).json(userPosts);
        } else {
            res.status(404).json({
                message: 'User posts not found'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving user posts'
        });
    }
});

router.delete('/:id', validateUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await data.remove(id);

        if(deleted) {
            res.status(204).end();
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while deleting user'
        });
    }
});

router.put('/:id', [validateUserId, validateUser], async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const updatedUser = await data.update(id, changes);

        if(changes.name !== '') {
            res.status(200).json(updatedUser);
        } else {
            res.status(400).json({
                message: 'User name is missing'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while updating the user'
        });
    }
});

//custom middleware

async function validateUserId(req, res, next) {
    try {
        const { id } = req.params;
        const userId = await data.getById(id);

        if(!isNaN(parseInt(id))) {
            if(userId) {
                req.user = userId;
                next();
            } else {
                res.status(400).json({
                    message: 'User id not found'
                });
            }
        } else {
            res.status(400).json({
                message: 'The User Id used is not a valid number'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving the user id'
        });
    }
};

function validateUser(req, res, next) {
    if(req.body && Object.keys(req.body).length) {
        next();
    } else {
        res.status(400).json({
            message: 'Please include request body'
        });
    }
};

function validatePost(req, res, next) {
    if(req.body && Object.keys(req.body).length) {
        next();
    } else {
        res.status(400).json({
            message: 'Please include request body'
        });
    }
};

module.exports = router;
