const express = require('express');
const userController = require('./../controllers/usersController');
const router = express.Router();


router.get('/users', (req, res) => res.redirect('/allUsers.html'));
router.get('/create-user', (req, res) => res.redirect('/create.html'));
router.get('/users/:id', (req, res) => res.redirect(`/user.html?id=${req.params.id}`));
router.get('/edit-user/:id', (req, res) => res.redirect(`/edit.html?id=${req.params.id}`));


module.exports = router;