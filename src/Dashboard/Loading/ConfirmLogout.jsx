const ConfirmLogout = ({ onConfirm, onCancel }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
          <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmLogout;
  