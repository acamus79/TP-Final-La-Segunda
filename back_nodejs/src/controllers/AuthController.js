const tokenJwt = require('../helpers/generateJwt');
const bcrypt = require('bcryptjs');
const config = require('../../config/config');
const {
    User
} = require('../models/index');


module.exports = {

    //Show all users
    async index(req, res) {
        let users = await User.findAll();
        if (users) {
            res.status(200).json({
                'status': 200,
                'data': users
            });
        } else {
            res.status(404).json({
                'status': 404,
                'msg': 'No se encontraron usuarios'
            });
        }
    },


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

            res.cookie('jwt', token, cookiesOptions);

            User.findByPk(user.id).then(x => {
                res.json({
                    'status': 200,
                    'msg': 'Usuario creado correctamente',
                    'data': {
                        'id': x.id,
                        'name': x.name,
                        'phone': x.email,
                        'role': x.role,
                        'email': x.email,
                        token
                    },
                })
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
                    'status': 404,
                    'msg': 'El Usuario no se encuentra registrado'
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
                        'status': 200,
                        'msg': 'Usuario autenticado correctamente',
                        'data': {
                            'id': user.id,
                            'name': user.name,
                            'email': user.email,
                            'phone': user.phone,
                            'role': user.role,
                            token
                        }
                    })
                } else {
                    // Unauthorized Access
                    res.status(401).json({
                        'status': 401,
                        'msg': 'Contraseña incorrecta'
                    })
                }
            }
        }).catch(err => {
            res.status(500).json({
                'status': 500,
                'msg': err.message
            });
        })
    },

    //Logout
    signOut(res) {
        res.clearCookie('jwt');
        res.status(200).json({
            'status': 200,
            'msg': "Sesión cerrada"
        });
    },

    //Show user by id
    show(req, res) {
        const id = req.params.id
        let user = User.findByPk(id, {
            include: "contact"
        });
        if (user) {
            res.status(200).json({
                'status': 200,
                'data': user
            });
        } else {
            res.status(404).json({
                'status': 404,
                'msg': 'No se encontro Usuario con el id ' + id
            });
        }
    }

}
