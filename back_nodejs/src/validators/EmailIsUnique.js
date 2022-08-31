const { User } = require('../models/index');

const EmailIsUnique = async (req, res, next) => {
  let email = req.body.email

  User.findOne({
    where:{email:email}
  }).then(user =>{
    if (user) {
      //Email invalido
      return res.status(400).json({msg: "El email ingresado ya se encuentra en uso"})
    }else{
      next()
    }
  }).catch(err => {
    //Fallo al buscar el email en la base de datos
    return res.status(500).json(err.message)
  })
};

module.exports = {
  EmailIsUnique
} 
