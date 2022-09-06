const Router = require('express');
const router = Router();

//Middlewares
const authUser = require('../middlewares/authUser');
const authAdmin = require('../middlewares/authAdmin');


//Controllers
const {
    showRepair,
    findAllRepair,  
    registerRepair,
    updateRepair,
    destroyRepair
} = require('../controllers/RepairController');

//Validaciones
const {
    validateRepair
} = require('../validators/RepairValidator');

//RUTAS Repair

/**
 * @openapi
 * path:
 * /api/repair/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: Show all repairs // Muestra todas las reparaciones
 *     summary: Trae todas las reparaciones
 *     tags:
 *       - Repair
 *   responses:
 *     200:
 *       description: Regresa un objeto con las reparaciones.
 *     401:
 *       description: Acceso no Autorizado.
 *     500:
 *       description: Error en el servidor.
 * */
router.get('/all', authAdmin, findAllRepair);

router.get('/:id', authUser, showRepair);

router.post('/', authUser, validateRepair, registerRepair);

router.put('/:id', authUser, validateRepair, updateRepair);

router.delete('/:id', authAdmin, destroyRepair);

module.exports = router;
