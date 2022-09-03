const tokenJwt = require('../helpers/generateJwt');
const bcrypt = require('bcrypt');
const config = require('../../config/config');
const {
    User
} = require('../models/index');


module.exports = {

    //Registro
    signUp(req, res) {

        let params = req.body;
        params.password = bcrypt.hashSync(params.password, Number.parseInt(config.rounds));

        //Crear un usuario
        User.create(params).then(user => {

            // Creamos el token
            let token = tokenJwt.generate(user);

            const cookiesOptions = {
                expire: new Date(Date.now() + config.expires * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie('jwt', token, cookiesOptions)

            res.json({
                'msg': 'Usuario creado correctamente',
                token
            });

        }).catch(err => {
            res.status(400).json({
                msg: err.message
            });
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
                    msg: "El Usuario no se encuentra registrado"
                });
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    // Creamos el token
                    let token = tokenJwt.generate(user);

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
    },

    //Funcion que dado un token vigente obtener uno nuevo y 
    //asi ir extendiendo la sesion
    refreshToken(req, res) {
        try {
            const user = User.findbyPk(req.user.id);
            const token = tokenJwt.generate(user);
            const cookiesOptions = {
                expire: new Date(Date.now() + config.expires * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie('jwt', token, cookiesOptions)
            res.json({
                token
            })
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}
