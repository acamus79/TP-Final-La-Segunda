require("dotenv").config();

//Puerto de Coneccion
const PORT = process.env.PORT;

//Configuracion de la base de datos
const host = process.env.DB_HOST;
const username = process.env.DB_USER || "root";
const database = process.env.DB_NAME || "clase";
const password = process.env.DB_PASS ;
const dialect = process.env.DB_TYPE || "mysql";
const logging = false;

//Configuracion de Sequelize
const seederStorage = "sequelize";
const seederStorageTableName = "seeds";
const migrationStorage = "sequelize";
const migrationStorageTableName = "migrations";

//Configuracion de JWT
const secret = process.env.AUTH_SECRET || "supersecret";
const expires = process.env.AUTH_EXPIRES || "2h";
const rounds = process.env.AUTH_ROUNDS || 10

module.exports = {
  PORT,
  host,
  username,
  database,
  password,
  dialect,
  logging,
  seederStorage,
  seederStorageTableName,
  migrationStorage,
  migrationStorageTableName,
  secret,
  expires,
  rounds
}
