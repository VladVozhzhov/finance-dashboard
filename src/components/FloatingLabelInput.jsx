import { useState } from "react";

const FloatingLabelInput = ({ type, placeholder, value, onChange, error, name, style, focusStyle, noFocusStyle, inputStyle, errorStyle, noErrorStyle }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <label
        className={`${style} ${
          isFocused || value ? `${focusStyle}` : `${noFocusStyle}` 
        }`}
      >
        {placeholder}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`${inputStyle} ${
          error ? `${errorStyle}` : `${noErrorStyle}`
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FloatingLabelInput;