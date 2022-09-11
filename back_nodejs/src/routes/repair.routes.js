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
 *       - repairs
 *     responses:
 *       200:
 *         description: Regresa un objeto con las reparaciones.
 *       401:
 *         description: Acceso no Autorizado.
 *       403:
 *         description: Token Expirado
 * */
router.get('/all', authAdmin, findAllRepair);


/**
 * @openapi
 * path:
 * /api/repair/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    description: Display a repair according to its iD // Muestra una reparación segun su iD
 *    summary: Trae una reparación especifica
 *    tags:
 *      - repairs
 *    responses:
 *        200:
 *         description: Regresa un objeto con las reparaciones.
 *        401:
 *          description: Acceso no Autorizado.
 *        403:
 *          description: Token Expirado
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: int(11)
 *          description: ID de la reparación a mostrar
 */
router.get('/:id', authUser, showRepair);

/**
 * @openapi
 * path:
 * /api/repair/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     description: Register a new repair // Registra una nueva reparación
 *     summary: Registra una nueva reparación
 *     tags:
 *       - repairs
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   format: varchar(100)
 *                   example: Cambio de Bomba de Agua
 *                 vehicle_id:
 *                   type: integer
 *                   format: int
 *                   example: 1
 *     responses:
 *       200:
 *         description: Regresa un objeto con la reparación creada.
 *       401:
 *         description: Acceso no Autorizado.
 *       403:
 *         description: Token Expirado
 * */
router.post('/', authUser, validateRepair, registerRepair);


/**
 * @openapi
 * path:
 * /api/repair/{id}:
 *   put:
 *      security:
 *        - bearerAuth: []
 *      description: Update the description of a repair // Actualiza la descripción de una reparación
 *      summary: Actualiza una reparación
 *      tags:
 *        - repairs
 *      responses:
 *        201:
 *          description: Actualizado correctamente
 *        401:
 *          description: Acceso no autorizado
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: int
 *          description: ID de la reparación a actualizar
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                description:
 *                  type: string
 *                  format: varchar(255)
 *                  example: Cambio de homonicinetica
 */
router.put('/:id', authUser, validateRepair, updateRepair);

/**
 * @openapi
 * path:
 * /api/repair/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     description:  Delete a repair by your iD // Elimina una reparación por su iD
 *     summary: Elimina una reparación por id
 *     tags:
 *       - repairs
 *     responses:
 *       200:
 *         description: Eliminado correctamente
 *       401:
 *         description: Acceso no autorizado
 *       403:
 *         description: Token Expirado
 *       404:
 *         description: Reparación no encontrada
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: int(11)
 *          description: ID de la reparación a eliminar
 */
router.delete('/:id', authAdmin, destroyRepair);

module.exports = router;
