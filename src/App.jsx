import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import Register from "./Register";
import Dashboard from "./Dashboard";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
