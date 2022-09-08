const {
    Contact
} = require('../models/index');

//GET /my_contacts/
const getByUser = async (req, res) => {
    const userId = req.user.id;
    let contacts = await Contact.findAll({
        where: {
            user_id: userId
        }
    });

    if (contacts) {
        res.status(200).json({
            'status': 200,
            'data': contacts
        });
    } else {
        res.status(404).json({
            'status': 404,
            'msg': 'No se encontro Contacto con el id ' + userId
        });
    }
}


//GET /contacts
const showAllContact = async (req, res) => {
    let pageAsNumber = Number.parseInt(req.query.page);
    let page = 0,
        size = 12;
    if (!Number.isNaN(pageAsNumber)) {
        page = pageAsNumber;
    }
    let contacts = await Contact.findAndCountAll({
        limit: size,
        offset: page * size,
        order: [
            ['id', 'DESC']
        ]
    });
    return res.status(200).json({
        'status': 200,
        content: contacts.rows,
        totalPages: Math.ceil(contacts.count / size),
        page,
    });
};

//POST /contact
const registerContact = async (req, res) => {

    let params = req.body;
    
    let contact = await Contact.create(params);
    if (contact) {
        return res.status(200).json({
            'status': 200,
            'msg': 'Creado correctamente',
            'data': contact
        })
    } else {
        return res.status(404).json({
            'status': 404,
            'msg': 'No se pudo crear el mensaje'
        })
    }
}

module.exports = {
    getByUser,
    registerContact,
    showAllContact
}
