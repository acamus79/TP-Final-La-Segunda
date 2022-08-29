const express = require('express');
const router = express.Router();

// Controllers
const AuthController = require('./controllers/AuthController');
const VehicleController = require('./controllers/VehicleController');

// Home
router.get('/', (req, res) => res.json({ hello: "World" }));

// Dos rutas: login y registro
// /api/singin & /api/singup
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

//Vehiculos
router.get('/api/vehicles', VehicleController.index);
router.get('/api/vehicle/:id', VehicleController.getOne);
router.get('/api/vehicle/brand/:brand', VehicleController.findOne)

module.exports = router;
