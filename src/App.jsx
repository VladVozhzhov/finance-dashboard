import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Auth from './Auth';
import Dashboard from './Dashboard';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signin" element={<Signin />}/>
        <Route path="/dashboard/:id" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;