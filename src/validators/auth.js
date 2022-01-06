const { check, validationResult } = require('express-validator');


exports.validateSignupRequest = [
    check('name')
    .notEmpty()
    .withMessage('Name is required'),
    check('gender')
    .notEmpty()
    .withMessage('Gender is required'),
    check('phoneNumber').isNumeric()
    .withMessage('Phone Number is required'),
];

exports.validateSigninRequest = [
    check('phoneNumber')
    .isNumeric()
    .withMessage('Valid Phone Number is required'),
];

exports.isRequestValidated = (req, res, next) => {
    
    const errors = validationResult(req);
    
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}