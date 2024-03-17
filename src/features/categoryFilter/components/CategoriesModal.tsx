import { IoClose } from "react-icons/io5";
import CategoriesList from "./CategoriesList";
import Modal from "../../../components/ui/Modal";

type TCategoriesModalProps = React.HTMLAttributes<HTMLDivElement> & {
  onClose: () => void;
};

function CategoriesModal({ onClose }: TCategoriesModalProps) {
  return (
    <Modal onClose={onClose} className="w-full sm:w-[80%] sm:top-5 max-w-[40rem]">
      <div className="py-2">
        <div className="flex justify-between gap-10 items-center">
          <h2 className="text-lg font-medium">Select a Category</h2>
          <button className="text-3xl" onClick={onClose}>
            <IoClose />
          </button>
        </div>
        <p className="text-medium flex justify-start gap-5 items-center border-b-[0.05rem] border-gray-200 py-5 px-2 hover:bg-gray-100 hover:text-blue-300 transition-colors duration-200 ease-in-out cursor-pointer rounded-sm font-medium ">
          All Categories
        </p>
        <CategoriesList />
      </div>
    </Modal>
  );
}

export default CategoriesModal;
