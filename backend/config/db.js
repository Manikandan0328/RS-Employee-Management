const { Sequelize } = require("sequelize");
//root is a user && password change your DB_name and password 
const sequelize = new Sequelize("rs_tech", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("MySQL connected"))
  .catch(err => console.error("MySQL error:", err));

module.exports = sequelize;

