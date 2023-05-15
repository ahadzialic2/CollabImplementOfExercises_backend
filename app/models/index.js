const dbConfig = require("../config/bazaConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.student = require("./studentModel.js")(sequelize, Sequelize);
db.grupa = require("./grupaModel.js")(sequelize, Sequelize);
db.vjezba = require("./vjezbaModel.js")(sequelize, Sequelize);

db.grupa.hasMany(db.student)
db.student.hasMany(db.vjezba)
module.exports = db;