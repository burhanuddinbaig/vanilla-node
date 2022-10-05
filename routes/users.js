const { Console } = require('console');
const express = require('express');
const router = express.Router();

const userController = require('../controller/user');   // to import Controllers
const helper = require('../helper/helper');   // to import Validations from helper

// login route
router.post('/login', userController.login);

// CREATE route
router.post('/create', helper.validateUser, userController.create);

// READ routes
router.get('/getinfo/:id', userController.getInfo);

router.get('/fetchall', userController.fetchall)

// Update route
router.put('/update/:id', userController.update)

// Delete route
router.get('/delete/:id', userController.delete);

module.exports = {router};