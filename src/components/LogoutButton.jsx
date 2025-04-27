import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ConfirmLogout from '../Dashboard/Loading/ConfirmLogout';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

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

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  return (
    <>
      <button
        onClick={openPopup}
        className="bg-red-500 dark:bg-red-800 text-white text-sm py-2 px-3 rounded hover:bg-red-600 hover:dark:bg-red-900 cursor-pointer transition duration-300 ease-in-out"
      >
        Logout
      </button>
      {showPopup && (
        <ConfirmLogout onConfirm={handleLogout} onCancel={closePopup} />
      )}
    </>
  );
};

export default LogoutButton;
