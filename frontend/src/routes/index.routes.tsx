import { Routes, Route } from "react-router-dom";
import { Home, Register, Users } from "../pages";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
}
