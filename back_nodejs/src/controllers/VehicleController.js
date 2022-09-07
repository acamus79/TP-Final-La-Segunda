const {
    Vehicle
} = require('../models/index');

const {
    User
} = require('../models/index');

//GET /vehicles/:id
const showVehicle = async (req, res) => {
    const id = req.params.id
    let vehicle = await Vehicle.findByPk(id, {
        include: "repairs"
    });
    if (vehicle) {
        res.status(200).json({
            'status': 200,
            'data': vehicle
        });
    } else {
        res.status(404).json({
            'status': 404,
            'msg': 'No se encontro el vehiculo'
        });
    }
};

//GET /vehicles
const findAllVehicle = async (req, res) => {
    let pageAsNumber = Number.parseInt(req.query.page);
    let page = 0,
        size = 12;
    if (!Number.isNaN(pageAsNumber)) {
        page = pageAsNumber;
    }

    let vehicles = await Vehicle.findAndCountAll({
        limit: size,
        offset: page * size,
        include: "repairs"
    });

    return res.status(200).json({
        'status': 200,
        content: vehicles.rows,
        totalPages: Math.ceil(vehicles.count / size),
        page,
    });
};

//POST /vehicle
const registerVehicle = async (req, res) => {
    let params = req.body;
    params.user_id = req.user.id; //id del usuario logueado
    let vehicle = await Vehicle.create(params)
    if (vehicle) {
        return res.status(200).json({
            'status': 200,
            'msg': 'Creado correctamente',
            'data': vehicle
        })
    } else {
        return res.status(404).json({
            'status': 404,
            'msg': 'No se recibieron los datos'
        })
    }
}

//PUT /vehicle/:id
const updateVehicle = async (req, res) => {
    const id = req.params.id;//id del vehiculo a editar
    const idUser = req.user.id;//id del usuario logueado

    let vehicles = await Vehicle.findAll({
        where: {
            user_id: idUser
        }
    });

    let exist = vehicles.find(ve => ve.id == id);
    
    if (exist) {
        let params = req.body;
        let vehicle = await Vehicle.update(params, {
            where: {
                id: req.params.id
            }
        });
        if (vehicle) {
            return res.status(201).json({
                'status': 201,
                'msg': 'Actualizado correctamente',
                'data': exist
            })
        } else {
            return res.status(404).json({
                'status': 404,
                'msg': 'No se recibieron los datos'
            })
        }
    } else {
        return res.status(403).json({
            'status': 403,
            'msg': 'No es el propietario del vehiculo'
        })
    }
}

//UPDATE by Manager /vehicle/:id
const updateVehicleByManager = async (req, res) => {
    const id = req.params.id;
    let params = req.body

    let vehicle = await Vehicle.update(params, {
        where: {
            id: id
        }
    })
    if (vehicle) {
        return res.status(201).json({
            'status': 201,
            'msg': 'Actualizado correctamente',
            'data': vehicle
        })
    } else {
        return res.status(404).json({
            'status': 404,
            'msg': 'Vehiculo no encontrado'
        })
    }
}

//DELETE /vehicles/:id
const destroyVehicle = async (req, res) => {
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
    showVehicle,
    findAllVehicle,
    registerVehicle,
    updateVehicle,
    destroyVehicle,
    updateVehicleByManager
}
