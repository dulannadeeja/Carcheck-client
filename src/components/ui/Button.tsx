import React, { useState } from "react";

import { cn } from "../../utils/mergeClasses";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

function Button({ className, disabled, ...props }: ButtonProps) {
  const [pending, setPending] = useState(false);
  return (
    <button
      className={cn("px-4 py-3 text-white bg-gray-500 rounded-md", className, {
        "bg-opacity-50": pending,
        "cursor-not-allowed": pending,
      })}
      {...props}
      disabled={pending || disabled}
    >
      Button
    </button>
  );
}

export default Button;
