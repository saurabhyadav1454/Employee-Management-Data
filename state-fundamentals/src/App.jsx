
import { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

import {
  getEmployees,
  saveEmployees
} from "./utils/storage";

function App() {
  const [employees, setEmployees] = useState(getEmployees);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    saveEmployees(employees);
  }, [employees]);

  const handleSave = (employeeData) => {
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === editingEmployee.id
            ? { ...employee, ...employeeData }
            : employee
        )
      );

      setEditingEmployee(null);
    } else {
      const newEmployee = {
        id: crypto.randomUUID(),
        ...employeeData
      };

      setEmployees((prev) => [...prev, newEmployee]);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    setEmployees((prev) =>
      prev.filter((employee) => employee.id !== id)
    );

    if (editingEmployee?.id === id) {
      setEditingEmployee(null);
    }
  };

  const handleCancel = () => {
    setEditingEmployee(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h1>Employee Management</h1>
          <p>Manage your employees in one place</p>
        </div>
      </header>

      <main>
        <Dashboard employees={employees} />

        <EmployeeForm
          onSave={handleSave}
          editingEmployee={editingEmployee}
          onCancel={handleCancel}
        />

        <EmployeeList
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
          search={search}
          setSearch={setSearch}
          department={department}
          setDepartment={setDepartment}
        />
      </main>
    </div>
  );
}

export default App;

