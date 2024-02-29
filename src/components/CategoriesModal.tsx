import CategoriesList from "./CategoriesList";
import Modal from "./ui/Modal";

function CategoriesModal() {
  return (
    <Modal headline="Select a Category">
      <div className="py-2">
        <p className="text-medium flex justify-start gap-5 items-center border-b-[0.05rem] border-gray-200 py-5 px-2 hover:bg-gray-100 hover:text-blue-300 transition-colors duration-200 ease-in-out cursor-pointer rounded-sm font-medium ">
          All Categories
        </p>
        <CategoriesList />
      </div>
    </Modal>
  );
}

export default CategoriesModal;
