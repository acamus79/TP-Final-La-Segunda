const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateRepair = [

    check('description')
    .exists()
    .isLength({min:5})
    .withMessage('La descripcion debe contener como minimo 5 caracteres'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateRepair }
