const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const upload = require("../middleware/upload");

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single employee
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ msg: "Not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add employee
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const employeeData = { ...req.body };
    if (req.file) {
      employeeData.image = `/uploads/${req.file.filename}`;
    }
    const newEmployee = await Employee.create(employeeData);
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update employee
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ msg: "Not found" });

    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    await employee.update(updatedData);
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete employee
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Employee.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ msg: "Not found" });
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
