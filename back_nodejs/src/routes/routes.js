const Router = require('express');
const router = Router();

const {
    signIn,
    signUp
} = require('../controllers/AuthController');

const {
    show,
    findAll,
    register,
    update,
    destroy
} = require('../controllers/VehicleController');

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
router.get('/api/vehicle/:id', show);
router.get('/api/vehicles', findAll);
router.post('/api/vehicle', register);
router.put('/api/vehicle/:id', update);
router.delete('/api/vehicle/:id', destroy);



/*
router.get("/find", index);

router.get("/find/all", findAll);

router.get("/find/:id", show);

router.post("/register", validateRegister, EmailIsUnique, register);

router.post("/login", validateLogin, login);

router.get('/logout', logOut)

router.delete("/:id", destroy);*/

module.exports = router;
