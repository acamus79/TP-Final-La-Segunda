const { Type } =  require('../models/index');

//GET /Type/:id
const show = async (req, res) => {
    const id = req.params.id
    let type = await Type.findOne({
        where: {
            id: id
        }
    });
    if (type) {
        return res.status(200).json({
            'status': 200,
            type
        })
    } else {
        return res.status(404).json({
            'status': 404,
            'msg': 'Type no encontrado'
        })
    }
};

//GET /Type
const findAll = async (req, res) => {
    let pageAsNumber = Number.parseInt(req.query.page);
    let page = 0,
        size = 12;
    if (!Number.isNaN(pageAsNumber)) {
        page = pageAsNumber;
    }

    let type = await Type.findAndCountAll({
        limit: size,
        offset: page * size,
    });

    return res.status(200).json({
        'status': 200,
        content: type.rows,
        totalPages: Math.ceil(Type.count / size),
        page,
    });
};

//POST /Type
const register = async (req, res) => {
    let params = req.body;
    let type = await Type.create(params)
    if (type) {
        return res.status(200).json({
            'status': 200,
            type,
            'msg': 'Creado correctamente'
        })
    } else {
        return res.status(404).json({
            'msg': 'No se recibieron los datos'
        })
    }
}

//PUT /type/:id
const update = async (req, res) => {
    const id = req.params.id
    let params = req.body
    let type = await Type.update(params, {
        where: {
            id: id
        }
    })
    if (type) {
        return res.status(200).json({
            'status': 200,
            'msg': 'Actualizado correctamente'
        })
    } else {
        return res.status(404).json({
            'status': 404,
            'msg': 'type no encontrado'
        })
    }
}

//DELETE /type/:id
const destroy = async (req, res) => {
    const id = req.params.id
    let type = await Type.destroy({
        where: {
            id: id
        }
    })
    if (type) {
        return res.status(200).json({
            'status': 200,
            'msg': 'Eliminado correctamente'
        })
    } else {
        return res.status(404).json({
            'status': 404,
            'msg': 'Type no encontrado'
        })
    }
};

module.exports = {
    show,
    findAll,
    register,
    update,
    destroy
}