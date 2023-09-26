import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps {
  type: string;
  placeholder: string;
  className: string;
  validate?: (value: string) => boolean;
}

function Input({ type, placeholder, className, validate }: InputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState("");

  const isPasswordField = type === "password" || type === "confirmPassword";

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (validate && !validate(inputValue)) {
      // 유효성 검사 함수가 존재하고, 유효하지 않은 값이 입력되었을 때 추후 구현
    }
  };

  return (
    <>
      <div className="relative">
        <input
          type={isPasswordField && isVisible ? "text" : type}
          placeholder={placeholder}
          className={className}
          value={value}
          onChange={handleChange}
        />
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
