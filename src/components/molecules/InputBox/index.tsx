import React from "react";
import AuthInput from "@/components/atoms/AuthInput"; // Import the modified Input component

interface InputConfig {
  type: string;
  placeholder: string;
  className: string;
  validate?: (value: string) => boolean; // New prop for validation function
}

interface Props {
  inputs: InputConfig[];
}

function InputBox({ inputs }: Props) {
  return (
    <div>
      {inputs.map((input, index) => (
        <AuthInput
          key={`input-${index.toString()}`}
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
