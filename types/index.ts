import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";

export interface ObjectProps {
  [key: string]: any;
}

export interface InputFormProps {
  type: string;
  name?: string;
  placeholder?: string;
  labelText?: string;
  required?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  handleKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  value: string;
  styles?: string;
}
export interface CustomButtonProps {
  type: "button" | "submit";
  label: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}
