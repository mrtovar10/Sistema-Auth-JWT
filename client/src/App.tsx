import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login/Login";

const EmployeeDashboard = () => {
  return <h1 className="text-3xl font-bold underline">Employee Dashboard</h1>;
};
const AdminDashboard = () => {
  return <h1 className="text-3xl font-bold underline">Admin Dashboard</h1>;
};
const ManagerDashboard = () => {
  return <h1 className="text-3xl font-bold underline">Manager Dashboard</h1>;
};

const Evaluation = () => {
  return <h1>Evaluation</h1>;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/evaluation" element={<Evaluation />} />
        <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
        <Route path="/dashboard/manager" element={<ManagerDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
