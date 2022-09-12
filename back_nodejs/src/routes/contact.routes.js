const Router = require('express');
const router = Router();

//Middlewares
const authAdmin = require('../middlewares/authAdmin');

//Validaciones
const {
    validateContact
} = require('../validators/ContactValidator');

//Controllers
const {
    showAllContact,
    registerContact,
} = require('../controllers/ContactController');


//RUTAS Contacts
/**
 * @openapi
 * path:
 * /api/contact/create:
 *  post:
 *    description: Register a new contact message // Registra un nueco mensaje de contacto
 *    summary: Registra un nuevo mensaje de contacto // Register a new contact message
 *    tags:
 *      - contacts
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  format: varchar(100)
 *                  example: Juan Carlos
 *                email:
 *                  model: string
 *                  format: email
 *                  example: holajuancarlos@mail.com
 *                phone:
 *                  model: string
 *                  format: varchar(100)
 *                  example: 011265748354
 *                subjet:
 *                  type: string
 *                  format: varchar(100)
 *                  example: Pedido de cotización
 *                text:
 *                  type: string
 *                  format: varchar(255)
 *                  example: Hola me gustaria poder manejar un sistema de reparaciones para mi taller de autos
 *    responses:
 *        200:
 *         description: Regresa un objeto con el mensaje creado.
 *        400:
 *          description: Errores de Validación.
 */
router.post('/create', validateContact, registerContact);

/**
 * @openapi
 * path:
 * /api/contact/get/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: Displays all registered contact messages, for administrators only // Muestra todos los mensajes de contacto registrados, solo para administradores
 *     summary: Trae todos los mensajes de contacto // Get all contact messages
 *     tags:
 *       - contacts
 *     responses:
 *       200:
 *         description: Regresa un objeto con los contactos.
 *       401:
 *         description: Acceso no Autorizado.
 *       403:
 *         description: Token Expirado
 * */
router.get('/get/all', authAdmin, showAllContact);

module.exports = router;
