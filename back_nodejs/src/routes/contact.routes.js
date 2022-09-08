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
router.post('/create', validateContact, registerContact);
router.get('/get/all', authAdmin, showAllContact);

module.exports = router;
