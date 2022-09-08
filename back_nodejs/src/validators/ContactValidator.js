const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateContact = [

    check('subjet')
    .exists()
    .isLength({min:4})
    .withMessage('El asunto debe contener como mínimo 4 caracteres'),
    check('text')
    .exists()
    .isLength({min:5})
    .withMessage('El texto debe contener como mínimo 5 caracteres'),


    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateContact }
