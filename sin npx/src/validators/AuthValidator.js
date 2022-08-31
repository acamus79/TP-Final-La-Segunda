const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateLogin = [
    
    check('email')
        .exists()
        .isLength({min:5})
        .withMessage('El correo debe contener mas de 5 caracteres')
        .isEmail()
        .withMessage('No contiene un formato de email valido'),
    check('password')
        .exists()
        .isLength({min:6})
        .withMessage('La contraseña debe contener mas de 6 caracteres'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateRegister = [
    
    check('email')
        .exists()
        .isLength({min:5})
        .withMessage('El correo debe contener mas de 5 caracteres')
        .isEmail()
        .withMessage('No contiene un formato de email valido'),
    check('password')
        .exists()
        .isLength({min:6})
        .withMessage('La contraseña debe contener mas de 6 caracteres'),
    check('confirmPassword')
        .exists()
        .isLength({min:6})
        .withMessage('La contraseña debe contener mas de 6 caracteres'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateLogin, validateRegister }