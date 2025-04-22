import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import Register from "./Register";
import Dashboard from "./Dashboard";
import axios from "axios";
import useAxiosInterceptors from './hooks/useAxiosInterceptors';

axios.defaults.withCredentials = true;

const AppRoutes = () => {
  useAxiosInterceptors();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard/:id" element={<Dashboard />} />
    </Routes>
  );
};

function App() {
  return (
    <AppRoutes />
  );
}

export default App;
