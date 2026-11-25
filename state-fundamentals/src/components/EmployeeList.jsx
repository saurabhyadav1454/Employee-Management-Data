
function EmployeeList({
  employees,
  onEdit,
  onDelete,
  search,
  setSearch,
  department,
  setDepartment
}) {
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "" || employee.department === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="list-card">
      <div className="list-header">
        <h2>Employee Directory</h2>

        <div className="filters">
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>
                    <span className="department-badge">
                      {employee.department}
                    </span>
                  </td>
                  <td>{employee.designation}</td>
                  <td>
                    ₹{employee.salary.toLocaleString("en-IN")}
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => onEdit(employee)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => onDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-message">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="record-count">
        Showing {filteredEmployees.length} of {employees.length} employees
      </p>
    </div>
  );
}

export default EmployeeList;
