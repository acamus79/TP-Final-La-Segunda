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

router.get('/:id', authUser, showRepair);

router.get('/all', authAdmin, findAllRepair);

router.post('/', authUser, validateRepair, registerRepair);

router.put('/:id', authUser, validateRepair, updateRepair);

router.delete('/:id', authAdmin, destroyRepair);

module.exports = router;
