const { Vehicle } = require('../models/index');

module.exports = {

    async index(req, res) {
        const vehicles = await Vehicle.findAll({
            include: [
                { association: 'owner' }
            ]
        });
        return res.json(vehicles);
    },

    async getOne(req, res) {
        const id = req.params.id;
        if (id) {
            const vehicle = await Vehicle.findByPk(id);
            return res.json(vehicle)
        } else {
            return res.json('ID requerido')
        }
    },

    async findOne (req, res) {
        const brand = req.params
        console.log('algo', brand)
        const modelVehicle = await Vehicle.findOne({ where: brand });
        if (modelVehicle === null ) {
            return res.send('Marca no encontrada')
        } else {
            return res.json(modelVehicle.brand)
        }
        
    }
};
