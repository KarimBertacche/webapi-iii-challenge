const express = require('express');
const data = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

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

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await data.getById(id);

        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving user'
        });
    }
});

router.get('/:id/posts', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;

        if(changes.name !== '') {
            const updatedUser = await data.update(id, changes);
            if(updatedUser) {
                res.status(200).json(updatedUser);
            }
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

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
