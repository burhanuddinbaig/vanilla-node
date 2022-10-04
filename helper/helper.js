const userController = require("../controller/user");   // to import Controllers

const validateUser = [
        userController.body('email').isEmail().normalizeEmail(),    // validation for email
        userController.body('password').isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        })
        .withMessage(`Password must be greater than 8 and contain at least one uppercase letter,
                one lowercase letter, and one number`)
    ]

module.exports = { 
    validateUser : validateUser
}