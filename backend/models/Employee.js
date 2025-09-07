const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  project: { type: String, required: true },
  status: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model("Employee", employeeSchema);
