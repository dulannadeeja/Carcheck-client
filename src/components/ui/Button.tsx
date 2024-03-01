import { cn } from "../../utils/mergeClasses";
import { VariantProps, cva } from "class-variance-authority";

// define button variations using cva function from class-variance-authority
// cva function takes an array of classes and an options object
const buttonVariations = cva(["rounded"], {
  variants: {
    intent: {
      primary: [
        "bg-blue-500",
        "text-white",
        "border-transparent",
        "hover:bg-blue-600",
      ],
      secondary: [
        "bg-white",
        "text-gray-800",
        "border-gray-400",
        "hover:bg-gray-100",
      ],
      iconRound: [
        "flex",
        "items-center",
        "justify-center",
        "bg-transparent",
        "text-gray-800",
        "rounded-full",
      ],
      iconText: ["flex", "items-center", "justify-start", "gap-2", "shrink-0"],
    },
    size: {
      none: [],
      smallRound: ["text-xl"],
      mediumRound: ["text-2xl"],
      largeRound: ["text-3xl"],
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
      large: ["text-lg", "py-3", "px-6"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

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
