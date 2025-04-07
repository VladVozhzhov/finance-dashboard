import { useState } from "react";
import { Link } from "react-router-dom";
import FloatingLabelInput from "./FloatingLabelInput";
import ParticleBg from "./ParticleBg";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "This field mustn't be empty";
    }
    if (!formData.password) {
      newErrors.password = "This field mustn't be empty";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Simulate incorrect input validation
      if (formData.username !== "testuser" || formData.password !== "testpass") {
        setErrors({
          username: "Incorrect username or password",
          password: "Incorrect username or password",
        });
      } else {
        alert("Registration successful!");
      }
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <ParticleBg />
      <div className="relative z-10 flex justify-center items-center h-screen">
        <div className="bg-white p-10 md:p-16 rounded-lg shadow-lg w-11/12 max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an Account</h1>
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            <FloatingLabelInput
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
            />
            <FloatingLabelInput
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
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