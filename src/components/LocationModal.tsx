import React from "react";

// components
import Modal from "./ui/Modal";
import DivisionsList from "./DivisionsList";
import CitiesList from "./CitiesList";

function LocationModal() {
  return (
    <Modal headline="Select a Location">
      <p className="text-medium flex justify-start gap-5 items-center border-b-[0.05rem] border-gray-200 py-5 px-2 hover:bg-gray-100 hover:text-blue-300 transition-colors duration-200 ease-in-out cursor-pointer rounded-sm font-medium ">
        All of Srilanka
      </p>
      <div className="grid grid-cols-2 gap-0 gap-x-7 px-2">
        <DivisionsList />
        <CitiesList className="lg:grid lg:grid-cols-3" />
      </div>
    </Modal>
  );
}

export default LocationModal;
