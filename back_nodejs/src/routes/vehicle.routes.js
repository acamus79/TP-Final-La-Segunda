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
    findAllVehicleByUser,
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
 *      - vehicles
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
 *      - vehicles
 *    responses:
 *        200:
 *         description: Regresa un objeto con el vechiculo y sus reparaciones.
 *        401:
 *          description: Acceso no Autorizado.
 */
router.get('/:id', authUser, showVehicle);

/**
 * @openapi
 * path:
 * /api/vehicle/all/user:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    description: Displays all vehicles of the authenticated user // Muestra todos los vehiculos del usuario autenticado
 *    summary: Trae todos los vehiculos del usuario autenticado
 *    tags:
 *      - vehicles
 *    responses:
 *        200:
 *         description: Regresa un objeto con los vechiculos y sus reparaciones.
 *        401:
 *          description: Acceso no Autorizado.
 */
router.get('/user/all', authUser, findAllVehicleByUser);

/**
 * @openapi
 * path:
 * /api/vehicle/mng/{id}:
 *   put:
 *      security:
 *        - bearerAuth: []
 *      description: Upgrade a vehicle by id, only for Administrators or Managers // Actualiza un vehículo por el id, solo pora Aministradores o Manager
 *      summary: Actualiza un vehículo por el id para uso de Administradores o Managers
 *      tags:
 *        - vehicles
 *      responses:
 *        201:
 *          description: Actualizado correctamente
 *        403:
 *          description: No es propietario del vehiculo
 *        401:
 *          description: Acceso no autorizado
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: int
 *          description: ID del vehículo
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: int
 *                  description: ID del usuario, se pueden transferir vehiculos
 *                  example: 6
 *                rto:
 *                  type: string
 *                  format: varchar(50)
 *                  example: 2023096
 *                gnc:
 *                  type: string
 *                  format: varchar(50)
 *                  example: 20221012
 *                service:
 *                  type: string
 *                  format: varchar(50)
 *                  example: 2021125
 *                insurance:
 *                  type: string
 *                  format: varchar(255)
 *                  example: La Segunda
 */
router.put('/mng/:id', authManager, updateVehicleByManager);

/**
 * @openapi
 * path:
 * /api/vehicle/{id}:
 *   put:
 *      security:
 *        - bearerAuth: []
 *      description: Update a vehicle by id, only by vehicle owner // Actualiza un vehículo por el id, solo por el propietario del vehiculo
 *      summary: Actualiza un vehículo por el id, solo por el propietario del vehiculo
 *      tags:
 *        - vehicles
 *      responses:
 *        201:
 *          description: Actualizado correctamente
 *        403:
 *          description: No es propietario del vehiculo
 *        401:
 *          description: Acceso no autorizado
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: int
 *          description: ID del vehículo
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                rto:
 *                  type: string
 *                  format: varchar(50)
 *                  example: 2023096
 *                gnc:
 *                  type: string
 *                  format: varchar(50)
 *                  example: 20221012
 *                service:
 *                  type: string
 *                  format: varchar(50)
 *                  example: 2021125
 *                insurance:
 *                  type: string
 *                  format: varchar(255)
 *                  example: La Segunda
 */
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
 *      - vehicles
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
 *     description:  Delete a vehicle by iD // Elimina un vehiculo por iD
 *     summary: Elimina un vehiculo por iD
 *     tags:
 *       - vehicles
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
