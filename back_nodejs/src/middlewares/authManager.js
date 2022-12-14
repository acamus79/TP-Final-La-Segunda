const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = (req, res, next) => {
    
    // Comprobar que existe el token
    if(!req.headers.authorization) {
        res.status(401).json({ msg: "Acceso no autorizado" });
    } else {

        // Comrpobar la validez de este token
        let token = req.headers.authorization.split(" ")[1];

        // Comprobar la validez de este token
        jwt.verify(token, config.secret, (err, decoded) => {

            if(err) {
                res.status(403).json({ msg: "Ha ocurrido un problema al decodificar el token", err });
            } else if(decoded.role == 3 || decoded.role == 1) {
                req.user = decoded;
                next();
            } else {
                res.status(401).json({ msg: "Acceso no autorizado" });
            }
        })
    }
};
