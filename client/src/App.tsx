import "./App.css";
import { Route, Routes } from "react-router-dom";

const Home = () => {
  return <h1 className="text-3xl font-bold underline">Home</h1>;
};

const Evaluation = () => {
  return <h1>Evaluation</h1>;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/evaluation" element={<Evaluation />} />
      </Routes>
    </>
  );
}

export default App;
