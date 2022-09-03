const Router = require('express');
const router = Router();

//Middlewares
const authManager = require('../middlewares/authManager');
const authAdmin = require('../middlewares/authAdmin');

//Controllers
const {
    showFleet,
    findAllFleet,
    registerFleet,
    addVehicleFleet,
    getByUser,
    updateFleet,
    destroyVehicle,
    updateVehicleByManager
} = require('../controllers/FleetController');

//Validaciones
const {
    validateFleet
} = require('../validators/FleetValidator');

//RUTAS Vehiculos
router.get('/:id', authManager, showFleet);
router.get('/all', authAdmin, findAllFleet);
router.post('/', authManager, validateFleet, registerFleet);
router.post('/add', authManager, addVehicleFleet);
router.get('/get/byuser', authManager, getByUser);
router.put('/:id', authManager, updateFleet);
router.put('/mng/:id', authManager, updateVehicleByManager);
router.delete('/:id', authManager, destroyVehicle);

module.exports = router;
