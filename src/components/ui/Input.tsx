import React from "react";
import { cn } from "../../utils/mergeClasses";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input({ className, type, placeholder, ...rest }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={cn(
        "border-[0.05rem] focus:outline focus:outline-1 border-solid py-[0.45rem] px-3 border-slate-800 rounded-md w-full",
        className
      )}
      {...rest}
    />
  );
}

export default Input;
