const {
    Vehicle
} = require('../models/index');

//GET /vehicles/:id
const show = async (req, res) => {
    const id = req.params.id
    let vehicle = await Vehicle.findOne({
        where: {
            id: id
        }
    });
    if (vehicle) {
        return res.status(200).json({
            'status': 200,
            vehicle
        })
    } else {
        return res.status(404).json({
            'status': 404,
            'msg': 'Vehiculo no encontrado'
        })
    }
};

//GET /vehicles
const findAll = async (req, res) => {
    let pageAsNumber = Number.parseInt(req.query.page);
    let page = 0,
        size = 12;
    if (!Number.isNaN(pageAsNumber)) {
        page = pageAsNumber;
    }

    let vehicles = await Vehicle.findAndCountAll({
        limit: size,
        offset: page * size,
    });

    return res.status(200).json({
        'status': 200,
        content: vehicles.rows,
        totalPages: Math.ceil(vehicles.count / size),
        page,
    });
};

//POST /vehicles
const register = async (req, res) => {
    let params = req.body;
    let vehicle = await Vehicle.create(params)
    if (vehicle) {
        return res.status(200).json({
            'status': 200,
            vehicle,
            'msg': 'Creado correctamente'
        })
    } else {
        return res.status(404).json({
            'msg': 'No se recibieron los datos'
        })
    }
}

//PUT /vehicles/:id
const update = async (req, res) => {
    const id = req.params.id
    let params = req.body
    let vehicle = await Vehicle.update(params, {
        where: {
            id: id
        }
    })
    if (vehicle) {
        return res.status(200).json({
            'status': 200,
            'msg': 'Actualizado correctamente'
        })
    } else {
        return res.status(404).json({
            'status': 404,
            'msg': 'Vehiculo no encontrado'
        })
    }
}

//DELETE /vehicles/:id
const destroy = async (req, res) => {
    const id = req.params.id
    let vehicle = await Vehicle.destroy({
        where: {
            id: id
        }
    })
    if (vehicle) {
        return res.status(200).json({
            'status': 200,
            'msg': 'Eliminado correctamente'
        })
    } else {
        return res.status(404).json({
            'status': 404,
            'msg': 'Vehiculo no encontrado'
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
