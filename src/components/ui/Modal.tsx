import { cn } from "../../utils/mergeClasses";

type TModalProps = {
  children: React.ReactNode;
  onClose: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

function Modal({ children, onClose, className }: TModalProps) {
  return (
    <>
      <div
        className={cn(
          "fixed top-0 md:top-5 left-[50%] translate-x-[-50%] z-50 bg-white p-3 md:rounded-lg overflow-auto",
          className
        )}
      >
        {children}
      </div>
      <div
        onClick={onClose}
        className="bg-gray-500 flex justify-center items-center fixed top-0 left-0 w-full h-full bg-opacity-50"
      ></div>
    </>
  );
}

export default Modal;
