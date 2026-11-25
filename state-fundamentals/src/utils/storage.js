
const STORAGE_KEY = "employees";

export const getEmployees = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveEmployees = (employees) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(employees)
  );
};
