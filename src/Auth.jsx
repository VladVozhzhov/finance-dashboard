import { AuthContext } from "./context/AuthContext";
import { DataContext } from "./context/DataContext";
import ParticleBg from "./components/ParticleBg";
import FloatingLabelInput from "./components/FloatingLabelInput";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const { data, setData } = useContext(DataContext);
  const { setAuth } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
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
      const response = await axios.post("http://localhost:3500/auth", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const { accessToken, userId } = response.data;
      
      // Validate
      if (!accessToken || !userId) {
        console.error("Missing token info in response:", response.data);
        throw new Error("Authentication data not returned from the server.");
      }

      setAuth({ accessToken, userId });

  
      navigate(`/dashboard/${userId}`);
    } catch (err) {
      setError("Invalid username or password");
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
            onSubmit={handleSubmit}
          >
            <FloatingLabelInput
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style="text-gray-500 transition-all duration-200 absolute pointer-events-none bg-none"
              focusStyle="text-sm left-[5px] top-0.5 bg-white px-1"
              noFocusStyle="left-3 top-4"
              inputStyle="border p-4 text-lg rounded-lg w-full focus:outline-none focus:ring-2"
              errorStyle="border-red-500 focus:ring-red-500"
              noErrorStyle="border-gray-300 focus:ring-blue-500"
            />
            <FloatingLabelInput
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style="text-gray-500 transition-all duration-200 absolute pointer-events-none bg-none"
              focusStyle="text-sm left-[5px] top-0.5 bg-white px-1"
              noFocusStyle="left-3 top-4"
              inputStyle="border p-4 text-lg rounded-lg w-full focus:outline-none focus:ring-2"
              errorStyle="border-red-500 focus:ring-red-500"
              noErrorStyle="border-gray-300 focus:ring-blue-500"
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
            Don’t have an account?{" "}
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
