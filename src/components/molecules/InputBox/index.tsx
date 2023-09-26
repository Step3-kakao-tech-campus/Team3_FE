import React from "react";
import Input from "@/components/atoms/Input"; // Import the modified Input component

interface InputConfig {
  type: string;
  placeholder: string;
  className: string;
}

interface InputBoxProps {
  inputs: InputConfig[];
}

function InputBox({ inputs }: InputBoxProps) {
  return (
    <div className="mb-4">
      {inputs.map((input, index) => (
        <Input
          key={index} // Make sure to provide a unique key for each input
          type={input.type}
          placeholder={input.placeholder}
          className={input.className}
        />
      ))}
    </div>
  );
}

export default InputBox;
