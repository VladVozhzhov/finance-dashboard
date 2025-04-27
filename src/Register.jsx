import { DataContext } from "./context/DataContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FloatingLabelInput from "./components/FloatingLabelInput";
import ParticleBg from "./components/ParticleBg";
import axios from "axios";

const Register = () => {
  const [redirect, setRedirect] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const checkResponse = await axios.post("http://localhost:3500/auth/check-username", {
        username: formData.username,
      });
  
      if (checkResponse.data.exists) {
        setErrors((prev) => ({ ...prev, username: "Username already exists" }));
        return;
      }
  
      const response = await axios.post("http://localhost:3500/register", formData);
  
      if (response.status === 201) {
        setInterval(() => navigate("/auth"), 5000); 
        setRedirect("Account created successfully! Redirecting to login...");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrors((prev) => ({
        ...prev,
        general: "An error occurred. Please try again later.",
      }));
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <ParticleBg />
      <div className="relative z-10 flex justify-center items-center h-screen">
        <div className="bg-white p-10 md:p-16 rounded-lg shadow-lg w-11/12 max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an Account</h1>
          <div className="items-center text-center mb-4">
            <p className="text-green-500 text-lg">{redirect}</p>
          </div>
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            <FloatingLabelInput
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
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
              error={errors.password}
              style="text-gray-500 transition-all duration-200 absolute pointer-events-none bg-none"
              focusStyle="text-sm left-[5px] top-0.5 bg-white px-1"
              noFocusStyle="left-3 top-4"
              inputStyle="border p-4 text-lg rounded-lg w-full focus:outline-none focus:ring-2"
              errorStyle="border-red-500 focus:ring-red-500"
              noErrorStyle="border-gray-300 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Register
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/auth" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;