const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config/config');
const {
    User
} = require('../models/index');
const {
    Role
} = require('../models/index');
const {
    models
} = require('mongoose');


/* const signUp = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    let user = await User.findOne({
        where: {
            email: email
        }
    });
    if (user) {
        return res.status(400).json({
            'status': 400,
            'msg': 'El usuario ya existe'
        })
    } else {
        user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        });
        return res.status(200).json({
            'status': 200,
            'msg': 'Usuario creado correctamente',
            'id': user.id,
            'name': user.name
        })
    }
}; */


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
                    'status': 200,
                    'msg': 'Usuario creado correctamente',
                    'id': user.id,
                    'name': user.name,
                    Bearer: token
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
                        'Bearer': token
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
