import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps {
  type: string;
  placeholder: string;
  className: string;
}

function Input({ type, placeholder, className }: InputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const isPasswordField = type === "password" || type === "confirmPassword";

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="relative">
        <input type={isPasswordField && isVisible ? "text" : type} placeholder={placeholder} className={className} />
        {isPasswordField && (
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={toggleVisibility}
            style={{
              width: "24px",
              height: "24px",
            }}
          >
            {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        )}
      </div>
      <p className="pb-[32px]" />
    </>
  );
}

export default Input;
