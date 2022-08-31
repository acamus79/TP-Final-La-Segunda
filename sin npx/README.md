
Instalar de forma global el cliente de sequelize

`npm install -g sequelize-cli`

------------

**Comandos utiles**

Crear un modelo + migration

`sequelize model:create --name users --attributes name:string,email:string`

Ejecutar migration

`sequelize db:migrate`

Ejecutar Rollback

`sequelize db:migrate:undo`

**Realizar una consulta** *(Busca 1 registro, devuelve el Model o null)*
```
const  Sequelize = require('sequelize');
const  users = require('../models').users;

const  datos = await  users.findOne({
	where: {
		user:  user
	}
})
```

**Realizar una consulta** *(Busca en todos los registros, devuelve un Array de Model)*
```
const  Sequelize = require('sequelize');
const  users = require('../models').users;

const  datos = await  users.findAll({
	where: {
		user:  user
	}
})
```

**Guardar un Registro**
```
const  Sequelize = require('sequelize');
const  users = require('../models').users;

const  datos = users.create({
	name:  name,
	email: email,
})
```
