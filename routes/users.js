const { Console } = require("console");
const express = require("express");
const userController = require("../controller/user");
const router = express.Router();

// login route
router.post("/login", userController.login);

// CREATE route
router.post("/create",
        userController.body('email').isEmail().normalizeEmail(),    // validation for email
        userController.body('password').isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        })
        .withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"),
        userController.create);

// READ routes
router.get("/getinfo/:id", userController.getInfo);

router.get("/fetchall", userController.fetchall)

// Update route
router.put("/update/:id", userController.update)

// Delete route
router.get("/delete/:id", userController.delete);

module.exports = {router};