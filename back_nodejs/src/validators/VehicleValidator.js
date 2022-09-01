const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateVechicle = [

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
    .isInt({min:1900, max: Number.parseInt(new Date().getYear())})
    .withMessage('El año debe ser un número entre 1900 y el año actual'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]
