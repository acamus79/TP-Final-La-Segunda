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
/**
 * @openapi
 * path:
 * /api/vehicle/all:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    description: Show all vehicles // Muestra todos los vehiculos
 *    summary: Trae todos los vehiculos
 *    tags:
 *      - Vehicle
 *    responses:
 *        200:
 *         description: Regresa un objeto con los vechiculos y sus reparaciones.
 *        401:
 *          description: Acceso no Autorizado.
 */
router.get('/all', authManager, findAllVehicle);

/**
 * @openapi
 * path:
 * /api/vehicle/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    description: Displays a vehicle by id // Muestra un vehiculo por id
 *    summary: Muestra un vehiculo segun un iD
 *    tags:
 *      - Vehicle
 *    responses:
 *        200:
 *         description: Regresa un objeto con el vechiculo y sus reparaciones.
 *        401:
 *          description: Acceso no Autorizado.
 */
router.get('/:id', authUser, showVehicle);

router.put('/mng/:id', authManager, updateVehicleByManager);

router.put('/:id', authUser, updateVehicle);

/**
 * @openapi
 * path:
 * /api/vehicle:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    description: Adds a vehicle to the logged in user // Agrega un vechiculo al usuario logeado
 *    summary: Agrega un vechiculo al usuario logeado
 *    tags:
 *      - Vehicle
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                brand:
 *                  type: string
 *                  format: varchar(100)
 *                  example: Ford
 *                model:
 *                  model: string
 *                  format: varchar(100)
 *                  example: Focus
 *                year:
 *                  model: integer
 *                  format: int32
 *                  example: 2021
 *                insurance:
 *                  type: string
 *                  format: varchar(255)
 *                  example: La Segunda
 *                type_id:
 *                  type: integer
 *                  format: int32
 *                  example: 2
 *                tag:
 *                  type: string
 *                  format: varchar(255)
 *                  example: AD550JY
 *    responses:
 *        200:
 *         description: Regresa un objeto con el vechiculo y sus reparaciones.
 *        401:
 *          description: Acceso no Autorizado.
 */
router.post('/', authUser, validateVehicle, registerVehicle);

/**
 * @openapi
 * path:
 * /api/vehicle/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     description:  Delete a vehicle by id // Elimina un vehiculo por id
 *     summary: Elimina un vehiculo por id
 *     tags:
 *       - Vehicle
 *     responses:
 *       200:
 *         description: Eliminado correctamente
 *       404:
 *         description: Vehiculo no encontrado
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: int(11)
 *          description: ID del vehiculo a eliminar
 */
router.delete('/:id', authAdmin, destroyVehicle);

module.exports = router;
