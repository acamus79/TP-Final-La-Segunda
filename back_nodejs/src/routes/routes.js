const Router = require('express');
const router = Router();

const {
    signIn,
    signUp
} = require('../controllers/AuthController');

const {
    showVehicle,
    findAllVehicle,
    registerVehicle,
    updateVehicle,
    destroyVehicle
} = require('../controllers/VehicleController');

const {
    showRepair,
    findAllRepair,
    registerRepair,
    updateRepair,
    destroyRepair
} = require('../controllers/RepairController');

const {
    validateLogin,
    validateRegister
} = require('../validators/AuthValidator');

const {
    EmailIsUnique
} = require('../validators/EmailIsUnique');

const {
    validateVechicle
} = require('../validators/VehicleValidator');

// Usuario: login y registro - /api/singin & /api/singup
router.post('/api/signin', validateLogin, signIn);
router.post('/api/signup', validateRegister, EmailIsUnique, signUp);

//Vehiculos
router.get('/api/vehicle/:id', showVehicle);
router.get('/api/vehicles', findAllVehicle);
router.post('/api/vehicle', registerVehicle);
router.put('/api/vehicle/:id', updateVehicle);
router.delete('/api/vehicle/:id', destroyVehicle);

//Repair
router.get('/api/repair/:id', showRepair);
router.get('/api/repairs', findAllRepair);
router.post('/api/repair', registerRepair);
router.put('/api/repair/:id', updateRepair);
router.delete('/api/repair/:id', destroyRepair);

/*
router.get("/find", index);

router.get("/find/all", findAll);

router.get("/find/:id", show);

router.post("/register", validateRegister, EmailIsUnique, register);

router.post("/login", validateLogin, login);

router.get('/logout', logOut)

router.delete("/:id", destroy);*/

module.exports = router;
