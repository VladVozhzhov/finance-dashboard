import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import Register from "./Register";
import LoadingTransfer from "./Dashboard/Loading/LoadingTransfer";
import axios from "axios";

axios.defaults.withCredentials = true;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard/:id" element={<LoadingTransfer />} />
    </Routes>
  );
};

function App() {
  return (
    <AppRoutes />
  );
}

export default App;
