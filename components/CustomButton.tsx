import { CustomButtonProps } from "@/types";
import React from "react";

export default function CustomButton({
  type,
  label,
  handleClick,
}: CustomButtonProps) {
  return (
    <button className="c-btn-blue" type={type} onClick={handleClick}>
      {label}
    </button>
  );
}
