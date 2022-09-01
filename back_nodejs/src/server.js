require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require("path");
const {
  json
} = require('body-parser');
const app = express();

//Requerir router
const router = require('./routes/routes');

//Settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extend: true
}));
app.use(json());

//Rutas
app.use('/', router);

app.use((res, next) => {
  res.status(404).json({
    message: 'Not found'
  })
})

module.exports = app;
