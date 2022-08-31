
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config/config');
const { User } = require('../models/index');


module.exports = {

    //Registro
    signUp(req, res) {

        let params = req.body;
        params.password = bcrypt.hashSync(params.password, Number.parseInt(config.rounds));

        //Crear un usuario
        User.create(params).then(user => {

            // Creamos el token
            let token = jwt.sign({
                user: user
            }, config.secret, {
                expiresIn: config.expires
            });

            const cookiesOptions = {
                expire: new Date(Date.now() + config.expires * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie('jwt', token, cookiesOptions)

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

    },

    // Login
    signIn(req, res) {

        let {
            email,
            password
        } = req.body;

        // Buscar usuario por el email
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
                    }, config.secret, {
                        expiresIn: config.expires
                    });

                    const cookiesOptions = {
                        expire: new Date(Date.now() + config.expires * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookiesOptions)

                    res.json({
                        token
                    })
                } else {
                    // Unauthorized Access
                    res.status(401).json({
                        msg: "Contraseña incorrecta"
                    })
                }
            }
        }).catch(err => {
            res.status(500).json(err.message);
        })
    },
    //Logout
    signOut(res) {
        res.clearCookie('jwt');
        res.status(200).json({
            msg: "Sesión cerrada"
        });
    }

}
