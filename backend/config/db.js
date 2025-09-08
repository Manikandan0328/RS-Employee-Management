const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("rs_tech", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("MySQL connected"))
  .catch(err => console.error("MySQL error:", err));

module.exports = sequelize;
