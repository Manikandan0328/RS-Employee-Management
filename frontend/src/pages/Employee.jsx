import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { MdEdit, MdOutlineDelete, MdVisibility } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import CustomButton from "../components/CustomButton";
import toast, { Toaster } from "react-hot-toast";


const API_URL = "http://localhost:5000/api/employees";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [form, setForm] = useState({});
  const [deletePopup, setDeletePopup] = useState({ open: false, id: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchEmployees = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const resetForm = () => {
    setMode("list");
    setSelectedEmployee(null);
    setForm({});
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) setForm({ ...form, imageFile: file });
  };

  const validateForm = () => {
    const requiredFields = [
      "name",
      "employeeId",
      "department",
      "designation",
      "project",
      "status",
      "type",
    ];
     
    for (let field of requiredFields) {
      if (!form[field] || form[field].trim() === "") {
        toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required!`);
        return false;
      }
    }
    return true;
  };

  const handleAddEmployee = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        if (key !== "imageFile") formData.append(key, form[key]);
      });
      if (form.imageFile) formData.append("image", form.imageFile);

      const res = await fetch(API_URL, { method: "POST", body: formData });
      const data = await res.json();
      setSuccessMsg("Employee added successfully!");
      setLoading(false);
      setTimeout(() => {
        setSelectedEmployee(data);
        setMode("list");
        setSuccessMsg("");
        fetchEmployees();
      }, 10);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleUpdateEmployee = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        if (key !== "imageFile") formData.append(key, form[key]);
      });
      if (form.imageFile) formData.append("image", form.imageFile);

      const res = await fetch(`${API_URL}/${selectedEmployee.id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      setSuccessMsg("Employee updated successfully!");
      setLoading(false);
      setTimeout(() => {
        setSelectedEmployee(data);
        setMode("view");
        setSuccessMsg("");
        fetchEmployees();
      }, 10);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async () => {
    try {
      await fetch(`${API_URL}/${deletePopup.id}`, { method: "DELETE" });
      setDeletePopup({ open: false, id: null });
      fetchEmployees();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
            <div className="loader mb-4"></div>
            <p>Processing...</p>
          </div>
        </div>
      )}

      {/* Success message */}
      {successMsg && (
        <div className="fixed top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow">
          {successMsg}
        </div>
      )}
      {/* List Page */}
      {mode === "list" && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">Employee</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded px-3 py-2">
                <FiSearch className="text-gray-500 mr-2 text-lg" />
                <input
                  type="text"
                  placeholder="Search.."
                  className="outline-none w-64 text-xl"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <CustomButton onClick={() => setMode("add")}>
                <IoMdAdd className="mr-2 text-4xl" />{" "}
                <span className="text-lg">Add New Employee</span>
              </CustomButton>
            </div>
          </div>

          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Employee ID</th>
                <th className="py-3 px-4 text-left">Department</th>
                <th className="py-3 px-4 text-left">Designation</th>
                <th className="py-3 px-4 text-left">Project</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map(emp => (
                  <tr key={emp.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 flex items-center gap-2">
                      {emp.image ? (
                        <img
                          src={`http://localhost:5000${emp.image}`}
                          alt="profile"
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <FaUserCircle size={28} className="text-gray-400" />
                      )}
                      {emp.name}
                    </td>

                    <td className="py-2 px-4">{emp.employeeId}</td>
                    <td className="py-2 px-4">{emp.department}</td>
                    <td className="py-2 px-4">{emp.designation}</td>
                    <td className="py-2 px-4">{emp.project}</td>
                    <td className="py-2 px-4">{emp.status}</td>
                    <td className="py-2 px-4">{emp.type}</td>
                    <td className="py-2 px-4 text-center flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedEmployee(emp);
                          setForm(emp);
                          setMode("view");
                        }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <MdVisibility size={20} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEmployee(emp);
                          setForm(emp);
                          setMode("edit");
                        }}
                        className="text-green-500 hover:text-green-700"
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        onClick={() =>
                          setDeletePopup({ open: true, id: emp.id })
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-20">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {/* View Employee Profile */}
      {mode === "view" && selectedEmployee && (
        <div className="mt-6 w-full">
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={resetForm}
              className="flex items-center text-gray-700 hover:text-black"
            >
              <IoIosArrowBack size={40} />
              <span className="ml-1 text-3xl">Employee Profile</span>
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl mx-auto">
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-6">
              {selectedEmployee.image ? (
                <img
                  src={`http://localhost:5000${selectedEmployee.image}`}
                  alt="profile"
                  className="w-32 h-32 rounded-lg object-cover border-4 border-blue-500"
                />
              ) : (
                <FaUserCircle size={120} className="text-gray-400" />
              )}
            </div>

            {/* Details */}

            <div className="max-w-2xl mx-auto">
              {/* Info Card */}
              <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
                {/* Row 1 - Name + Employee ID */}
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="text-lg font-medium">
                      {selectedEmployee.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Employee ID</p>
                    <p className="text-lg font-medium">
                      {selectedEmployee.employeeId}
                    </p>
                  </div>
                </div>

                {/* Row 2 - Department + Designation */}
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="text-lg font-medium">
                      {selectedEmployee.department}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Designation</p>
                    <p className="text-lg font-medium">
                      {selectedEmployee.designation}
                    </p>
                  </div>
                </div>

                {/* Row 3 - Project + Status */}
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div>
                    <p className="text-sm text-gray-600">Project</p>
                    <p className="text-lg font-medium">
                      {selectedEmployee.project}
                    </p>
                  </div>
                 
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="text-lg font-medium">
                      {selectedEmployee.status}
                    </p>
                  </div>
                </div>

                {/* Row 4 - Type */}
                
                <div className="grid grid-cols-2 gap-4 p-4">
                    
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="text-lg font-medium">
                      {selectedEmployee.type}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Form */}
      {(mode === "add" || mode === "edit") && (
        <div className="mt-6 w-full">
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={resetForm}
              className="flex items-center text-gray-700 hover:text-black"
            >
              <IoIosArrowBack size={40} />
              <span className="ml-1 text-3xl">
                {mode === "add" ? "Add Employee" : "Edit Employee"}
              </span>
            </button>
          </div>

          <div className="bg-white shadow rounded p-6 w-full">
            {/* Image Upload */}
            <div className="flex justify-left mb-6">
              <label className="cursor-pointer">
                {form.imageFile ? (
                  <img
                    src={URL.createObjectURL(form.imageFile)}
                    alt="preview"
                    className="w-28 h-28 rounded-lg object-cover border"
                  />
                ) : form.image ? (
                  <img
                    src={`http://localhost:5000${form.image}`}
                    alt="preview"
                    className="w-28 h-28 rounded-lg object-cover border"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-lg border flex items-center justify-center bg-gray-100 relative">
                    <FaCamera size={28} className="text-gray-500" />
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  label: "Name",
                  field: "name",
                  placeholder: "Enter employee name",
                },
                {
                  label: "Employee ID",
                  field: "employeeId",
                  placeholder: "EMP001",
                },
                {
                  label: "Department",
                  field: "department",
                  placeholder: "Enter department",
                },
                {
                  label: "Designation",
                  field: "designation",
                  placeholder: "Enter designation",
                },
                {
                  label: "Project",
                  field: "project",
                  placeholder: "Enter project name",
                },
                
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="block text-lg font-bold mb-1">
                    {label} <span className="text-black-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form[field] || ""}
                    placeholder={placeholder} // <-- Add placeholder here
                    onChange={e =>
                      setForm({ ...form, [field]: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </div>
              ))}
              {/* Status */}
              <div>
                <label className="block text-lg font-bold mb-1">
                  Status <span className="text-black-500">*</span>
                </label>
                <select
                  value={form.status || ""}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                >
                  <option value="">Select</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Trainee">Trainee</option>
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="block text-lg font-bold mb-1">
                  Type <span className="text-black-500">*</span>
                </label>
                <select
                  value={form.type || ""}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                >
                  <option value="">Select</option>
                  <option value="Office">Office</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            {mode === "add" && (
              <CustomButton onClick={handleAddEmployee}>
                Add Employee
              </CustomButton>
            )}
            {mode === "edit" && (
              <>
                <CustomButton 
                  onClick={resetForm}
                 variant="danger"
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  onClick={handleUpdateEmployee}
                  variant="primary"
                >
                  Update
                </CustomButton>
              </>
            )}
          </div>
        </div>
      )}

      {/* Delete Popup */}
      {deletePopup.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
            <MdOutlineDelete className="text-red-500 mx-auto mb-4" size={60} />
            <h3 className="text-lg font-semibold mb-6">
              Are you sure you want to delete this employee?
            </h3>
            <div className="flex justify-center gap-4">
              <CustomButton
                onClick={() => setDeletePopup({ open: false, id: null })}
                variant="primary"
              >
                Cancel
              </CustomButton>
              <CustomButton
                onClick={handleDeleteEmployee}
                variant="danger" className="px-6"
              >
                Yes
              </CustomButton>
            </div>
          </div>
        </div>
      )}
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Employee;
