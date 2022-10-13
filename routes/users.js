const { Console } = require('console');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

const userController = require('../controller/user');   // to import Controllers
const { restrict } = require('../helper/helper');
const helper = require('../helper/helper');   // to import Validations from helper

// login route
router.post('/login',  userController.login);

// CREATE route
router.post('/create', helper.validateUser, userController.create);

// Upload Image
router.put('/upload/:id', userController.authenticateToken, upload.single('profile'), userController.upload);

// READ routes
router.get('/getinfo/:id', userController.authenticateToken, userController.getInfo);

router.get('/fetchall', userController.authenticateToken, userController.fetchall);

// Protected
// router.get('/protected', restrict);

// Update route
router.put('/update', userController.update);

// Delete route
router.get('/delete/:id', userController.authenticateToken, userController.delete);

module.exports = {router};