
Para poder ejecutar el codigo se recomienda:

* Crear una base de datos en local llamada `arak`
* Instalar de forma global el cliente de sequelize `npm install -g sequelize-cli`
* Instalar los modulos de Node Js en el directorio del backend `npm i`

------------

1	Ejecutar las migraciones a la Base de Datos `sequelize db:migrate`
	Deberia obtener un resultado similar al siguiente:
```
Sequelize CLI [Node: 18.7.0, CLI: 6.4.1, ORM: 6.21.4]

Loaded configuration file "config\config.js".
== 20220616145004-create-user: migrating =======
== 20220616145004-create-user: migrated (3.225s)

== 20220821034412-create-type: migrating =======
== 20220821034412-create-type: migrated (2.460s)

== 20220831033036-create-vehicle: migrating =======
== 20220831033036-create-vehicle: migrated (3.496s)

== 20220831035905-create-repairs: migrating =======
== 20220831035905-create-repairs: migrated (2.311s)

== 20220831035952-create-fleet: migrating =======
== 20220831035952-create-fleet: migrated (2.720s)

```

2	Ejecutar los seeders de la Base de Datos `sequelize db:seed:all`
	Deberia obtener un resultado similar
```
Sequelize CLI [Node: 18.7.0, CLI: 6.4.1, ORM: 6.21.4]

Loaded configuration file "config\config.js".
== 20220811234144-create-some-user: migrating =======
== 20220811234144-create-some-user: migrated (0.854s)

== 20220821035720-create-some-type: migrating =======
== 20220821035720-create-some-type: migrated (0.669s)

== 20220831035610-create-some-vehicles: migrating =======
== 20220831035610-create-some-vehicles: migrated (0.761s)

```

3	Y para ejecutar el servidor backend de Node Js de forma local `npm start`

