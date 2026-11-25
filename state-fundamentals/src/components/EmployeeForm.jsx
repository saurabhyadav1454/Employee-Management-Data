
import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  department: "",
  designation: "",
  salary: ""
};

function EmployeeForm({ onSave, editingEmployee, onCancel }) {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name,
        email: editingEmployee.email,
        department: editingEmployee.department,
        designation: editingEmployee.designation,
        salary: editingEmployee.salary
      });
    } else {
      setFormData(initialForm);
    }

    setError("");
  }, [editingEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.department ||
      !formData.designation.trim() ||
      !formData.salary
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (Number(formData.salary) <= 0) {
      setError("Salary must be greater than zero.");
      return;
    }

    onSave({
      ...formData,
      salary: Number(formData.salary)
    });

    setFormData(initialForm);
    setError("");
  };

  return (
    <div className="form-card">
      <h2>
        {editingEmployee ? "Edit Employee" : "Add New Employee"}
      </h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            name="name"
            placeholder="Employee Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>

          <input
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
          />

          <input
            name="salary"
            type="number"
            min="1"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-btn">
            {editingEmployee ? "Update Employee" : "Add Employee"}
          </button>

          {editingEmployee && (
            <button
              type="button"
              className="secondary-btn"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
