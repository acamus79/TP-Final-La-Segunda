const Router = require('express');
const router = Router();

//Middlewares
const authUser = require('../middlewares/authUser');
const authAdmin = require('../middlewares/authAdmin');

//Validaciones
const {
    validateContact
} = require('../validators/ContactValidator');

//Controllers
const {
    showAllContact,
    registerContact,
    getByUser,
    getByUserId,
} = require('../controllers/ContactController');


//RUTAS Contacts
router.get('/:id', authAdmin, getByUserId);
router.post('/create', authUser, validateContact, registerContact);
router.get('/get/all', authAdmin, showAllContact);
router.get('/get/byuser', authUser, getByUser);

module.exports = router;
