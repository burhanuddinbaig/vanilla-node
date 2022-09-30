const { Console } = require("console");
const express = require("express");
const userController = require("../controller/user");
const router = express.Router();

// login route
router.post("/login", userController.login);

// CREATE routes
router.get("/addUser", userController.addUser);

router.post("/create", userController.create);

// READ routes
router.get("/getinfo/:id", userController.getInfo);

router.get("/fetchall", userController.fetchall)

// Update route
router.put("/update/:id", userController.update)

// Delete route
router.get("/delete/:id", userController.delete);

module.exports = {router};