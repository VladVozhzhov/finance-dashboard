import { DataContext } from "./context/DataContext";
import ParticleBg from "./ParticleBg";
import FloatingLabelInput from "./FloatingLabelInput";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const { data, setData } = useContext(DataContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3500/auth", formData);
      const { accessToken, id } = response.data;

      setData({ id, accessToken }); 
      navigate(`/dashboard/${id}`);
    } catch (err) {
      setError("Invalid username or password");
      console.error(err);
    }
  };

  return (
    <div className="relative">
      <ParticleBg />
      <div className="relative z-10 flex justify-center items-center h-screen">
        <div className="bg-white p-10 md:p-16 rounded-lg shadow-lg w-11/12 max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Log In</h1>
          <form 
            className="flex flex-col space-y-6" 
            onSubmit={(e) => handleSubmit(e)}              
          >
            <FloatingLabelInput
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <FloatingLabelInput
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Log In
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don`t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;