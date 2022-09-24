const { Console } = require("console");
const express = require("express");
const userController = require("../controller/user");
const router = express.Router();

router.get("/addUser", userController.addUser);

router.get("/getinfo", userController.getInfo);

router.post("/create", userController.create);

router.get("/delete/:id", userController.delete);

module.exports = {router};