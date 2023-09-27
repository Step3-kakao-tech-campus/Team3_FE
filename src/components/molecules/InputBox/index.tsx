import React from "react";
import AuthInput from "@/components/atoms/AuthInput";

interface InputConfig {
  type: string;
  placeholder: string;
  className: string;
  validate?: (value: string) => boolean;
}

interface Props {
  inputs: InputConfig[];
  onInputChange: (fieldName: string, value: string) => void; // Include onInputChange prop here
}

function InputBox({ inputs, onInputChange }: Props) {
  return (
    <div>
      {inputs.map((input, index) => (
        <AuthInput
          key={`input-${index.toString()}`}
          type={input.type}
          placeholder={input.placeholder}
          className={input.className}
          validate={input.validate}
          onInputChange={(value: any) => onInputChange(input.type, value)} // Pass input value to parent component
        />
      ))}
    </div>
  );
}

export default InputBox;
