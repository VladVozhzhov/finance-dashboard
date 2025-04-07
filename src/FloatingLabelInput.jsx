import { useState } from "react";

const FloatingLabelInput = ({ type, placeholder, value, onChange, error, name }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <label
        className={`text-gray-500 transition-all duration-200 absolute ${
          isFocused || value ? "text-sm left-[5px] top-0.5 bg-white px-1" : "left-3 top-4"
        }`}
      >
        {placeholder}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`border p-4 text-lg rounded-lg w-full focus:outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FloatingLabelInput;