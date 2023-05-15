module.exports = {
   HOST: "localhost",
   USER: "root",
   PASSWORD: "",
   DB: "spirala4BWT",
   dialect: "mysql",
   pool: {
     max: 5,
     min: 0,
     acquire: 30000,
     idle: 10000
   }
 };
 /*const Sequelize = require("sequelize");
const sequelize = new Sequelize("spirala4BWT", "root", "", {
   host: "127.0.0.1",
   dialect: "mysql"
});
module.exports = sequelize;
*/