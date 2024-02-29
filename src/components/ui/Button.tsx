import { cn } from "../../utils/mergeClasses";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  pending?: boolean;
}

function Button({ className, disabled, pending, ...props }: ButtonProps) {
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
