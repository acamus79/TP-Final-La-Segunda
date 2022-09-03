const Router = require('express');
const router = Router();

//Middlewares
const authUser = require('../middlewares/authUser');


//Controllers
const {
    signIn,
    signUp,
    signOut,
    refreshToken,
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
  *      description: Sign in // Iniciar sesión
  *      summary: Authenticate user // Realiza la autenticación del usuario
  *      tags:
  *        - auth
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
  *                  example: supersecret
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
  *        - auth
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
  *                  example: supersecret
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

router.get('/signout', signOut);

router.get('/token', authUser, refreshToken);

module.exports = router;
