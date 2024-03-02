import { cva } from "class-variance-authority";

// define button variations using cva function from class-variance-authority
// cva function takes an array of classes and an options object
const buttonVariations = cva(["rounded"], {
    variants: {
      intent: {
        primary: [
          "bg-blue-300",
          "text-white",
          "border-transparent",
          "hover:bg-blue-600",
        ],
        secondary: [
          "bg-white",
          "text-gray-800",
          "hover:bg-gray-100",
          "border-2",
          "border-blue-300",
          "border-solid",
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

  export default buttonVariations;