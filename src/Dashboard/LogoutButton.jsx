import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3500/logout', {
        withCredentials: true,
      });
    } catch (err) {
      console.error('Logout request failed:', err);
    } finally {
      logout();
      navigate('/');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white text-sm py-2 px-3 rounded hover:bg-red-600 cursor-pointer transition duration-300 ease-in-out"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
