const { Repair } = require('../models/index');
const { db } = require('../models/index');

//GET /Repair/:id
const show = async (req, res) => {
    const id = req.params.id
    let repair = await Repair.findOne({
        where: {
            id: id
        }
    });
    if (repair) {
        return res.status(200).json({
            'status': 200,
            repair
        })
    } else {
        return res.status(404).json({
            'status': 404,
            'msg': 'Repair no encontrado'
        })
    }
};

//GET /Repair
const findAll = async (req, res) => {
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
const register = async (req, res) => {
    let params = req.body;
    const { description, vehicle_id } = req.body
    let repair = await Repair.create(description);

    /* let rb  = await db.Sequelize.query('INSERT INTO "vehicle_repair" (vehicle_id, repair_id, createdAt, updatedAt ) VALUES ("vehicleid", "repairid", "now", "now")', {
        replacements: {vehicleid : vehicle_id },
        replacements: { repairid: repair.id},
        replacements: { now: Date()},
        type: db.sequelize.QueryTypes.INSERT
      }); */

    /* queryInterface.bulkInsert('vehicle_repair', [{
        vehicle_id: params.vehicle_id,
        repair_id: repair.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }]); */

    if (repair) {
        return res.status(200).json({
            'status': 200,
            repair,
            'msg': 'Creado correctamente'
        })
    } else {
        return res.status(404).json({
            'msg': 'No se recibieron los datos'
        })
    }
}

//PUT /repair/:id
const update = async (req, res) => {
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
            'msg': 'Actualizado correctamente'
        })
    } else {
        return res.status(404).json({
            'status': 404,
            'msg': 'repair no encontrado'
        })
    }
}

//DELETE /repair/:id
const destroy = async (req, res) => {
    const id = req.params.id
    let repair = await Repair.destroy({
        where: {
            id: id
        }
    })
    if (repair) {
        return res.status(200).json({
            'status': 200,
            'msg': 'Eliminado correctamente'
        })
    } else {
        return res.status(404).json({
            'status': 404,
            'msg': 'Repair no encontrado'
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