const {
    Repair
} = require('../models/index');
const {
    Vehicle
} = require('../models/index');

//GET /Repair/:id
const showRepair = async (req, res) => {
    const id = req.params.id
    let repair = await Repair.findOne({
        where: {
            id: id
        }
    });
    if (repair) {
        return res.status(200).json({
            'status': 200,
            'data': repair
        })
    } else {
        return res.status(404).json({
            'status': 404,
            'msg': 'Reparación no encontrada'
        })
    }
};

//GET /Repair
const findAllRepair = async (req, res) => {
    let pageAsNumber = Number.parseInt(req.query.page);
    let page = 0,
        size = 12;
    if (!Number.isNaN(pageAsNumber)) {
        page = pageAsNumber;
    }

    let repair = await Repair.findAndCountAll({
        limit: size,
        offset: page * size,
    });

    return res.status(200).json({
        'status': 200,
        content: repair.rows,
        totalPages: Math.ceil(Repair.count / size),
        page,
    });
};

//POST /Repair
const registerRepair = async (req, res) => {
    const {
        description,
        vehicle_id
    } = req.body;
    let repair = await Repair.create({
        description
    });
    let vehicle = await Vehicle.findOne({
        where: {
            id: vehicle_id
        }
    });
    if (!vehicle) {
        return res.status(404).json({
            'status': 404,
            'msg': 'Vehículo no encontrado'
        })
    }

    await repair.addVehicle(vehicle, {
        through: {
            selfGranted: false
        }
    });

    if (repair) {
        return res.status(200).json({
            'status': 200,
            'msg': 'Creado correctamente',
            'data': repair
        })
    } else {
        return res.status(404).json({
            'status': 404,
            'msg': 'No se recibieron los datos'
        })
    }
}

//PUT /repair/:id
const updateRepair = async (req, res) => {
    const id = req.params.id
    let params = req.body
    let repair = await Repair.update(params, {
        where: {
            id: id
        }
    })
    if (repair) {
        return res.status(200).json({
            'status': 200,
            'msg': 'Actualizado correctamente',
            'data': repair
        })
    } else {
        return res.status(404).json({
            'status': 404,
            'msg': 'Reparación no encontrada'
        })
    }
}

//DELETE /repair/:id
const destroyRepair = async (req, res) => {
    const id = req.params.id
    let repair = await Repair.destroy({
        where: {
            id: id
        }
    })
    if (repair) {
        return res.status(200).json({
            'status': 200,
            'msg': 'Eliminada correctamente',
            'data': repair
        })
    } else {
        return res.status(404).json({
            'status': 404,
            'msg': 'Reparación no encontrada'
        })
    }
};

module.exports = {
    showRepair,
    findAllRepair,
    registerRepair,
    updateRepair,
    destroyRepair
}
