const {
    check
} = require('express-validator');
const {
    validateAuth
} = require('../helpers/validateHelperAuth');

const {
    validateResult
} = require('../helpers/validateHelper');


const validateLogin = [

    check('email').trim()
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('El email no es valido'),

    check('password').trim()
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({
        min: 6
    }).withMessage('La contraseña debe tener al menos 6 caracteres'),

    (req, res, next) => {
        validateAuth(req, res, next)
    }
]

const validateRegister = [
    check('name').trim()
    .exists()
    .isLength({
        min: 2
    })
    .withMessage('El nombre debe contener como minimo 2 caracteres'),
    check('email')
    .exists()
    .isLength({
        min: 5
    })
    .withMessage('El correo debe contener mas de 5 caracteres')
    .isEmail()
    .withMessage('No contiene un formato de email valido'),
    check('password')
    .exists()
    .isLength({
        min: 6
    })
    .withMessage('La contraseña debe contener mas de 6 caracteres'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {
    validateLogin,
    validateRegister
}
