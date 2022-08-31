
const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {

    // Login
    signIn(req, res) {

        let {
            email,
            password
        } = req.body;
        
        // Buscar usuario
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (!user) {
                res.status(404).json({
                    msg: "Usuario no encontrado"
                });
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    // Creamos el token
                    let token = jwt.sign({
                        user: user
                    }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    res.json({
                        toke: token
                    })
                } else {
                    // Unauthorized Access
                    res.status(401).json({
                        msg: "Contraseña incorrecta"
                    })
                }
            }
        }).catch(err => {
            res.status(500).json(err);
        })
    },

    // Registro
    signUp(req, res) {

        if (req.body.password.length < 6) {
            res.status(400).json({
                msg: "La contraseña debe tener 6 caracteres como minimo"
            });
        } else {
            // Crear un usuario
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds))
            }).then(user => {

                // Creamos el token
                let token = jwt.sign({
                    user: user
                }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });

                res.json({
                    user: user,
                    token: token
                });

            }).catch(err => {
                if (err.errors[0].message == "users.email must be unique") {
                    res.status(400).json({
                        msg: "Correo ya registrado"
                    });
                } else {
                    res.status(400).json({
                        msg: err.errors[0].message
                    });
                }
            });
        }
    }

}
