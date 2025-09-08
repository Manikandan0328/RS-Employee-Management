const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const employeeRoutes = require("./routes/employee");
const path = require("path");

//middleware
const app = express();
app.use(cors());
app.use(express.json());

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/employees", employeeRoutes);

//  DB connection
sequelize.sync().then(() => console.log("DB connected with MySQL"));

//start server
app.listen(5000, () => console.log("Server running on port 5000"));
