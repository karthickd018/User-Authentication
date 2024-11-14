import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/home";
import { ToastContainer, toast } from "react-toastify";


function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />

        <Route path="/" element={<Navigate to="/signup" replace />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
