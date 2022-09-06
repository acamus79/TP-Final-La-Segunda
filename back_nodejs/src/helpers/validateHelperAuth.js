const {
    validationResult
} = require('express-validator');

const validateAuth = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        res.status(403).json({
            'msg': error.array().map(e => e.msg)[0]
        })
    }
}

module.exports = {
    validateAuth
}
