const {
    Vehicle
} = require('../models/index');

const {
    Fleet
} = require('../models/index');

//GET /fleets/:id
const showFleet = async (req, res) => {
    const id = req.params.id
    let fleet = await Fleet.findByPk(id, {
        include: "vehicles"
    });
    if (fleet) {
        res.status(200).json({
            'status': 200,
            fleet
        });
    } else {
        res.status(404).json({
            'status': 404,
            'msg': 'No se encontro la flota'
        });
    }
};

//GET /fleets/
const getByUser = async (req, res) => {
    const userId = req.user.id;
    
    let fleets = await Fleet.findAll({
        where: {
            user_id: userId
        }
    });

    if (fleets) {
        res.status(200).json({
            'status': 200,
            'data': fleets
        });
    } else {
        res.status(404).json({
            'status': 404,
            'msg': 'No se encontro la flota'
        });
    }
}

//GET /vehicles
const findAllFleet = async (req, res) => {
    let pageAsNumber = Number.parseInt(req.query.page);
    let page = 0,
        size = 12;
    if (!Number.isNaN(pageAsNumber)) {
        page = pageAsNumber;
    }
    let fleets = await Fleet.findAndCountAll({
        limit: size,
        offset: page * size,
        include: "vehicles", //include: "vehicles" es para que me traiga los vehiculos de la flota
    });
    return res.status(200).json({
        'status': 200,
        content: fleets.rows,
        totalPages: Math.ceil(fleets.count / size),
        page,
    });
};

//POST /fleet
const registerFleet = async (req, res) => {

    let params = req.body;
    params.user_id = req.user.id; //id del usuario logueado

    await Fleet.findOrCreate({
        where: {
            name: params.name,
            user_id: params.user_id
        }
    }).then(([fleet, created]) => {
        if (created) {
            res.status(201).json({
                'status': 201,
                'msg': 'Flota '+ fleet.name+' creada con exito',
                'data': fleet
            });
        } else {
            res.status(409).json({
                'status': 409,
                'msg': 'Ya existe una flota con ese nombre'
            });
        } 
    }).catch(err => {
        res.status(500).json({
            'status': 500,
            'msg': 'Error al crear la flota'
        });
    });
}

//POST
const addVehicleFleet = async (req, res) => {

    let {
        id_vehicle,
        id_fleet
    } = req.body;

    let fleet = await Fleet.findByPk(id_fleet);
    let vehicle = await Vehicle.findByPk(id_vehicle);

    fleet.getVehicles().then(item => {

        let exist = item.find(ve => ve.id == id_vehicle);

        if (!exist) {
            fleet.addVehicle(vehicle);
            return res.status(201).json({
                'status': 201,
                'msg': 'Vehiculo ' + vehicle.tag + ' agregado a la flota ' + fleet.name,
            })
        } else {
            return res.status(409).json({
                'status': 409,
                'msg': 'El vehiculo ya se encuentra en la flota'
            })
        }
    });
}

//PUT /vehicle/:id
const updateFleet = async (req, res) => {
    const id = req.params.id; //id del vehiculo a editar
    const idUser = req.user.id; //id del usuario logueado

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
            return res.status(200).json({
                'status': 200,
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
    showFleet,
    findAllFleet,
    registerFleet,
    addVehicleFleet,
    getByUser,
    updateFleet,
    destroyVehicle,
    updateVehicleByManager
}
