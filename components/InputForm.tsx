import { InputFormProps } from "@/types";
import React from "react";

export default function InputForm({
  type,
  name,
  placeholder,
  labelText,
  required,
  onChange,
  handleKeyDown,
  value,
  styles,
}: InputFormProps) {
  return (
    <div className={`input-form ${styles}`}>
      {labelText && (
        <label className="self-start" htmlFor={name}>
          {labelText}
        </label>
      )}
      <input
        className="input"
        onKeyDown={handleKeyDown}
        id={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
