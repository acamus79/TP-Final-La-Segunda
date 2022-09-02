const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateVehicle = [

    check('brand')
    .exists()
    .isLength({min:2})
    .withMessage('La marca debe contener como minimo 2 caracteres'),
    check('model')
    .exists()
    .isLength({min:2})
    .withMessage('El modelo debe contener como minimo 2 caracteres'),
    check('year')
    .exists()
    .isInt({min:1900, max: new Date().getFullYear()})
    .withMessage('El año debe ser un número entre 1900 y el año actual'),
    check('insurance')
    .exists()
    .isLength({min:5})
    .withMessage('La póliza debe contener como minimo 5 caracteres'),
    check('tag')
    .exists()
    .isLength({min:5})
    .withMessage('La patente debe contener como minimo 5 caracteres'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateVehicle }
