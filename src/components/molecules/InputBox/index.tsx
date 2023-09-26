import React from "react";
import Input from "@/components/atoms/Input"; // Import the modified Input component

interface InputConfig {
  type: string;
  placeholder: string;
  className: string;
  validate?: (value: string) => boolean; // New prop for validation function
}

interface InputBoxProps {
  inputs: InputConfig[];
}

function InputBox({ inputs }: InputBoxProps) {
  return (
    <div>
      {inputs.map((input) => (
        <Input
          key={null}
          type={input.type}
          placeholder={input.placeholder}
          className={input.className}
          validate={input.validate}
        />
      ))}
    </div>
  );
}

export default InputBox;
