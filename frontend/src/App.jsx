import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dash from "./pages/Dash";
import Login from "./pages/Login";
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dash" element={<Dash />} />
      </Routes>
    </BrowserRouter>
  );
}
