require('dotenv').config();
const { User } = require('../database/models/index')
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


//API

const index = async (req,res) => {
    let users = await User.findAll()
    return res.status(200).json({'status':200, users})
};

const show = async (req,res) => {
    const id = req.params.id
    let user = await User.findOne({ where: { id: id } });
    if (user) {
        return res.status(200).json({'status':200, user})
    } else {
        return res.status(404).json({'status':404, 'msg':'usuario no encontrado'})
    }
};

const findAll = async (req,res) => {
    let pageAsNumber = Number.parseInt(req.query.page);
    let page = 0, size = 12;
    if (!Number.isNaN(pageAsNumber)) {
      page = pageAsNumber;
    }
    
    let users = await User.findAndCountAll({ 
      limit: size, 
      offset: page * size, 
    })

    return res.status(200).json({'status':200, 
    content: users.rows,
    totalPages: Math.ceil(users.count / size),
    page,})
};

const register = async (req,res) => {
    let params = req.body;
    params.password = await bcrypt.hash(req.body.password, 10);
    let user = await User.create(params)
    if (user) {
        return res.status(200).json({'status':200, user, 'msg':'Creado correctamente'})
    } else {
        return res.status(404).json({'msg':'No se recibieron los datos'})
    }
};

const login = async (req, res) => {
    const {email, password} = req.body
  
    //Comprobar email en DB
    User.findOne({ where:{email:email} })
    .then(user =>{
      if (!user) {
        //Email invalido
        res.status(404).json({msg: 'Email invalido'}) 
      }else if(bcrypt.compareSync(password, user.password)){
        //Seteo un Token
        let token = jwt.sign({id:user.id, email: user.email, role: user.role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "8h"})
        
        const cookiesOptions = {
          expire: new Date(Date.now()+process.env.TOKEN_EXPIRES * 24 * 60 * 60 * 1000),
          httpOnly: true
        }
        res.cookie('jwt', token , cookiesOptions)
  
        return res.status(200).json({user, token})
      }else{
        //Acceso denegado - Usuario y/o contraseña invalidos
        return res.status(401).json({msg: 'Usuario y/o contraseña incorrecta'})
      }
    }).catch(err => {
      //Fallo al buscar el email en la base de datos
      return res.status(500).json(err.message)
    })
}

const destroy = async (req,res) => {
    const id = req.params.id;
    let user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({msg:"Usuario no encontrado"})
    } else {
        user.destroy().then(user => {
          res.status(200).json({status:200,user})
        })
    }
};

const logOut = async (req, res, next) => {
    //Eliminar cookie jwt
    res.clearCookie('jwt')
    //Redirigir a la vista de login
    return res.redirect('/login')
};
  
const policy = async (req, res, next) => {
    let user = await User.findOne({ where: { id: req.params.id } });
    if (user.role == 'admin'){
      req.isAdmin = true;
      next()
    } else {
      res.status(401).json({msg:"No autorizado"})
    }
  };

module.exports = {
    index,
    show,
    findAll,
    register,
    login,
    destroy,
    logOut,
    policy
};