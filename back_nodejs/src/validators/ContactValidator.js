const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateContact = [

    check('name')
    .exists()
    .withMessage('El nombre es requerido')
    .isLength({min:3})
    .withMessage('El Nombre debe contener como mínimo 3 caracteres'),
    check('email')
    .exists()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('El email no es válido'),
    check('text')
    .exists()
    .withMessage('El texto es requerido')
    .isLength({min:5})
    .withMessage('El texto debe contener como mínimo 5 caracteres'),


    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateContact }
