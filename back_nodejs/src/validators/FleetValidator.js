const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateFleet = [

    check('name')
    .exists()
    .isLength({min:3})
    .withMessage('El nombre debe contener como minimo 3 caracteres'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateFleet }
