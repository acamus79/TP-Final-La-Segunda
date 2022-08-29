const { Vehicle } = require('../models/index'); 

module.exports = {
    
    async index(req, res) {
        const vehicles = await Vehicle.findAll({
            include: [
                { association: 'owner' }
            ]
        });
        return res.json(vehicles);
    }
};
