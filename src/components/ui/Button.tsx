import { cn } from "../../utils/mergeClasses";
import { VariantProps } from "class-variance-authority";

import buttonVariations from "../../utils/buttonVariations";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariations> {
  disabled?: boolean;
  pending?: boolean;
  children: React.ReactNode;
}

function Button({
  children,
  className,
  disabled,
  size,
  intent,
  pending,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariations({
          intent,
          size,
        }),
        className,
        {
          "bg-opacity-50": pending,
          "cursor-not-allowed": pending,
        }
      )}
      {...props}
      disabled={pending || disabled}
    >
      {children}
    </button>
  );
}

export default Button;
