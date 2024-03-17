// components
import Modal from "../../../components/ui/Modal";
import DivisionsList from "./DivisionsList";
import CitiesList from "./CitiesList";
import { IoClose } from "react-icons/io5";
import { useCitiesLoader } from "../hooks/useCitiesLoader";

type TLocationModalProps = {
  onClose: () => void;
};

function LocationModal({ onClose }: TLocationModalProps) {
  useCitiesLoader();

  return (
    <Modal
      onClose={onClose}
      className="h-[100dvh] md:max-h-screen-2rem w-full md:w-[40rem] lg:w-[50rem] xl:w-[60rem]"
    >
      <div className="flex justify-between gap-10 items-center">
        <h2 className="text-lg font-medium">Select a Category</h2>
        <button className="text-3xl" onClick={onClose}>
          <IoClose />
        </button>
      </div>
      <p className="text-medium flex justify-start gap-5 items-center border-b-[0.05rem] border-gray-200 py-5 px-2 hover:bg-gray-100 hover:text-blue-300 transition-colors duration-200 ease-in-out cursor-pointer rounded-sm font-medium ">
        All of Srilanka
      </p>
      <div className="grid grid-cols-2 gap-0 gap-x-10 px-2 items-start">
        <DivisionsList className="" />
        <CitiesList className="lg:grid lg:grid-cols-2 xl:grid-cols-3" />
      </div>
    </Modal>
  );
}

export default LocationModal;
