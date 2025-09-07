const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const multer = require("multer");
const path = require("path");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single employee
router.get("/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ msg: "Not found" });
  res.json(employee);
});

// Add employee with image
router.post("/", upload.single("image"), async (req, res) => {
  const employeeData = { ...req.body };
  if (req.file) {
    employeeData.image = `/uploads/${req.file.filename}`;
  }

  const employee = new Employee(employeeData);

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update employee with image
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const employeeData = { ...req.body };
    if (req.file) {
      employeeData.image = `/uploads/${req.file.filename}`;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      employeeData,
      { new: true }
    );

    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete employee
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
