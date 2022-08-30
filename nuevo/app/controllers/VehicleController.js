const { Vehicle } = require('../models/index');

module.exports = {
    // trae todo los Vehiculos
    async index(req, res) {
        const vehicles = await Vehicle.findAll({
            include: [
                { association: 'owner' }
            ]
        });
        return res.json(vehicles);
    },
    // trae un vehiculo segun ID
    async getOne(req, res) {
        const id = req.params.id;
        if (id) {
            const vehicle = await Vehicle.findByPk(id);
            return res.json(vehicle)
        } else {
            return res.json('ID requerido')
        }
    },

    async findOne(req, res) {
        const brand = req.params
        console.log('algo', brand)
        const modelVehicle = await Vehicle.findOne({ where: brand });
        if (modelVehicle === null) {
            return res.send('Marca no encontrada')
        } else {
            return res.json(modelVehicle)
        }

    },

    async findOneVehiclebyUser(req, res) {
        const userId = req.params
        const modelVehicle = await Vehicle.findAll({ where: userId === userId.userId });
        if (modelVehicle === null) {
            return res.send('Marca no encontrada')
        } else {
            return res.json(modelVehicle)
        }

    },

    // agrega un vehiculo a la lista
    async createVehicle(req, res) {
        const body = req.body
        const rto = req.body.rto
        body.rto = new Date(rto)
        console.log(body)
        res.json(body)

        if (!body) {
            return res.send('Error datos igresados')
        } else {
            const vehicleCreated = await Vehicle.create(body)
            return vehicleCreated
        }

    },

    // elimina
    async deleteVehicle(req, res) {
        const id = req.params
        const vehicleDeleted = await Vehicle.destroy({
            where: id
        });
        if (vehicleDeleted) {
            return res.json(
                { msj: "Vehiculo eliminado exitosamente", status: 200 })
        } else {
            return res.json('No se econtro el vehiculo')
        }
    },

    async updateVehicle(req, res) {
        try {
            const body = req.body
            const rto = req.body.rto
            const id = req.params.id
            body.rto = new Date(rto)
            const vehicleUpdated = await Vehicle.update({ ...body }, { where: { id: id } })
            if (vehicleUpdated != 0) {
                return res.json({ vehicleUpdated })
            } else {
                return res.json({ error })
            }
        } catch (error) {
            console.log(error)
            return res.json({ error })
        }

    }
};
