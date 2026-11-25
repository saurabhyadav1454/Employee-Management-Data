
function Dashboard({ employees }) {
  const totalEmployees = employees.length;

  const departments = new Set(
    employees.map((employee) => employee.department)
  ).size;

  const totalSalary = employees.reduce(
    (total, employee) => total + Number(employee.salary),
    0
  );

  const averageSalary =
    totalEmployees > 0 ? totalSalary / totalEmployees : 0;

  const stats = [
    { title: "Total Employees", value: totalEmployees },
    { title: "Departments", value: departments },
    {
      title: "Total Salary",
      value: `₹${totalSalary.toLocaleString("en-IN")}`
    },
    {
      title: "Average Salary",
      value: `₹${Math.round(averageSalary).toLocaleString("en-IN")}`
    }
  ];

  return (
    <div className="dashboard">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.title}>
          <p>{stat.title}</p>
          <h2>{stat.value}</h2>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
