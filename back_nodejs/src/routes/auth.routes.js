const Router = require('express');
const router = Router();

//Middlewares
const authAdmin = require('../middlewares/authAdmin');
const authUser = require('../middlewares/authUser');


//Controllers
const {
    signIn,
    signUp,
    index,
    displayUser,
    update,
    //signOut,
} = require('../controllers/AuthController');


//Validaciones
const {
    validateLogin,
    validateRegister
} = require('../validators/AuthValidator');

const {
    EmailIsUnique
} = require('../validators/EmailIsUnique');

//RUTAS Usuario: login y registro - 
/**
  * @openapi
  * path:
  * /signin:
  *   post:
  *      description: Autentica un Usuario // Sign in
  *      summary: Realiza la autenticación del usuario // Authenticate user
  *      tags:
  *        - users
  *      requestBody:
  *        required: true
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              properties:
  *                email:
  *                  type: string
  *                  format: varchar(100)
  *                  example: test@mail.com
  *                password:
  *                  type: string
  *                  format: varchar(255)
  *                  example: 1234567
  *      responses:
  *        200:
  *         content:
  *            application/json:
  *              schema:
  *                type: object
  *                properties:
  *                  Bearer:
  *                    type: string
  *                    format: varchar(255)
  *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IlRlc3QiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE2NjIwODgwNzcsImV4cCI6MTY2MjA5MTY3N30.kJ8WjCl_J9IIuTGu7HsvHJmevaUTPA-wI1sK3sAlVso
  *        401:
  *          description: Contraseña incorrecta
  *        404:
  *          description: El Usuario no se encuentra registrado
  *        500:
  *          description: Error de conexión con el servidor o en la base de datos
  */
router.post('/signin', validateLogin, signIn);

/**
  * @openapi
  * path:
  * /signup:
  *   post:
  *      description: Inscribirse en el sistema // Sign up
  *      summary: Registra el usuario en el sistema // Register user
  *      tags:
  *        - users
  *      requestBody:
  *        required: true
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              properties:
  *                name:
  *                  type: string
  *                  format: varchar(100)
  *                  example: John Doe
  *                email:
  *                  type: string
  *                  format: varchar(100)
  *                  example: test@mail.com
  *                password:
  *                  type: string
  *                  format: varchar(255)
  *                  example: 1234567
  *      responses:
  *        200:
  *          description: Usuario creado correctamente
  *          content:
  *            application/json:
  *              schema:
  *                type: object
  *                properties:
  *                  Bearer:
  *                    type: string
  *                    format: varchar(255)
  *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IlRlc3QiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE2NjIwODgwNzcsImV4cCI6MTY2MjA5MTY3N30.kJ8WjCl_J9IIuTGu7HsvHJmevaUTPA-wI1sK3sAlVso
  *        400:
  *          description: Validación de nombre, email o contraseña incorrecta // Validation of name, email or password incorrect
  *        500:
  *          description: Error de conexión con el servidor o en la base de datos // Error connecting to the server or database
  */
router.post('/signup', validateRegister, EmailIsUnique, signUp);

/**
 * @openapi
 * path:
 * /api/index:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    description: Show all users for administrators only // Muestra todos los usuarios solo para administradores
 *    summary: Trae todos los usuarios // Get all users
 *    tags:
 *      - users
 *    responses:
 *        200:
 *         description: Regresa un objeto con los usuarios.
 *        401:
 *          description: Acceso no Autorizado.
 */
router.get('/index', authAdmin, index);

/**
 * @openapi
 * path:
 * /api/display/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    description: Get one user by id // Muestra un usuario por iD
 *    summary: Trae un usuario segun su id // Get one user by id
 *    tags:
 *      - users
 *    responses:
 *        200:
 *         description: Regresa un objeto con el usuario.
 *        401:
 *          description: Acceso no Autorizado.
 */
router.get('/display/:id', authUser, displayUser);

/**
 * @openapi
 * path:
 * /api/update/{id}:
 *   put:
 *      security:
 *        - bearerAuth: []
 *      description: Update a User by id // Actualiza un usuario por el id
 *      summary: Actualiza un Usuario por el id // Update a User by id
 *      tags:
 *        - users
 *      responses:
 *        201:
 *          description: Actualizado correctamente
 *        403:
 *          description: Token no válido
 *        401:
 *          description: Acceso no autorizado
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: int
 *          description: ID del usuario
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  format: varchar(50)
 *                  example: Juan Carlos
 *                phone:
 *                  type: string
 *                  format: varchar(50)
 *                  example: 0112487596
 */
router.put('/update/:id', update);

//router.post('/signout', signOut); 

module.exports = router;
