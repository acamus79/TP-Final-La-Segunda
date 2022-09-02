require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require("path");
const {
  json
} = require('body-parser');

//Documentation
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerOptions = require("./utils/swagger-options");
const setup = swaggerJSDoc(swaggerOptions);

const app = express();

//Routers
const routerAuth = require('./routes/auth.routes');
const routerVehicle = require('./routes/vehicle.routes');
const routerRepair = require('./routes/repair.routes');

//Settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extend: false
}));
app.use(json());

//Rutas
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(setup));
app.use('/api', routerAuth);
app.use('/api/vehicle', routerVehicle);
app.use('/api/repair', routerRepair);


app.use((req, res, next) => {
  res.status(404).json({
    status: '404',
    descripcion: 'Pagina no encontrada'
  })
})

module.exports = app;
