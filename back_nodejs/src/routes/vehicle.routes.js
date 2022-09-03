const Router = require('express');
const router = Router();

//Middlewares
const authUser = require('../middlewares/authUser');
const authAdmin = require('../middlewares/authAdmin');
const authManager = require('../middlewares/authManager');


//Controllers
const {
    showVehicle,
    findAllVehicle,
    registerVehicle,
    updateVehicle,
    destroyVehicle,
    updateVehicleByManager
} = require('../controllers/VehicleController');

//Validaciones
const {
    validateVehicle
} = require('../validators/VehicleValidator');

//RUTAS Vehiculos
router.get('/:id', authUser, showVehicle);
router.get('/all', authManager, findAllVehicle);
router.post('/', authUser, validateVehicle, registerVehicle);
router.put('/:id', authUser, updateVehicle);
router.put('/mng/:id', authManager, updateVehicleByManager);
router.delete('/:id', authAdmin, destroyVehicle);


module.exports = router;
