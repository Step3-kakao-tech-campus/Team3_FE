import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import BlankBar from "../BlankBar";

interface InputProps {
  type: string;
  placeholder: string;
  className: string;
  onInputChange: (value: string) => void;
}

function AuthInput({ type, placeholder, className, onInputChange }: InputProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState("");

  const isPasswordField = type === "password" || type === "confirmPassword";

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    onInputChange(inputValue);
  };

  const temp = isVisible ? "text" : "password";
  const inputType = isPasswordField ? temp : type;

  return (
    <>
      <div className="relative">
        <input
          // type={isPasswordField && isVisible ? "text" : type}
          type={inputType}
          placeholder={placeholder}
          className={className}
          value={value}
          onChange={handleChange}
        />
        {isPasswordField && (
          <button
            type="button"
            className="w-6 h-6 absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={toggleVisibility}
          >
            {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        )}
      </div>
      <BlankBar />
    </>
  );
}

export default AuthInput;
