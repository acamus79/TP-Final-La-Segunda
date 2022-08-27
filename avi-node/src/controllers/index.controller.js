const {
    User
} = require('../database/models/index')

const index = async (req, res) => {
    let users = await User.findAll()
    return res.status(200).json({
        users
    })
};

const show = async (req, res) => {
    const id = req.params.id
    let user = await User.findOne({
        where: {
            id: id
        }
    });
    return res.status(200).json({
        user
    })
};

const store = async (req, res) => {
    const params = req.body;
    console.log(params);

    params.password = bcrypt.hashSync(params.password, 10);

    console.log(params);

    let verifica = await User.findOne({
        where: {
            email: params.email
        }
    });
    if (verifica) {
        return res.status(400).json({
            'status': '400',
            'descripcion': 'El correo ya existe'
        });
    } else {

        let user = await User.create(params)
        if (user) {
            return res.status(200).json({
                'msg': 'Creado correctamente'
            })
        } else {
            return res.status(404).json({
                'msg': 'No se recibieron los datos'
            })
        }
    }
};

const update = async (req, res) => {
    const params = req.body;
    const id = req.params.id;
    let user = await User.findByPk(id);
    if (id) {
        user.save().then(user => {
            res.status(201).json({
                'msg': 'Editado correctamente'
            })
        })
    } else {
        return res.status(404).json({
            msg: "Usuario no encontrado"
        })
    }
};

const destroy = async (req, res) => {
    const id = req.params.id;
    let user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: "Usuario no encontrado"
        })
    } else {
        user.destroy().then(user => {
            res.status(200).json({
                status: 200,
                user
            })
        })
    }
    return res.status(200).json({
        'msg': 'Eliminado correctamente'
    })
};

const policy = async (req, res, next) => {
    let user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    if (user.role == 'admin') {
        req.isAdmin = true;
        next()
    } else {
        res.status(401).json({
            msg: "No autorizado"
        })
    }
};

module.exports = {
    index,
    show,
    store,
    destroy,
    update,
    policy
};
