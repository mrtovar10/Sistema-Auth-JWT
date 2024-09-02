import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login/Login";
import { AdminDashboard } from "./components/adminDashboard/AdminDashboard";
import { Register } from "./components/register/Register";
import { EmployeeDashboard } from "./components/employeeDashboard/EmployeeDashboard";
// import { ManagerDashboard } from "./components/managerDashboard/ManagerDashboard";

const Evaluation = () => {
  return <h1>Evaluation</h1>;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/evaluation" element={<Evaluation />} />
        <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
        {/* Temporalmente se muestra el componente AdminDashboard en la ruta manager */}
        <Route path="/dashboard/manager" element={<AdminDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
