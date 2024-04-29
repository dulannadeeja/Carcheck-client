
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Button from "../../../../components/ui/Button";
import { FiTrash } from "react-icons/fi";
import { cn } from "../../../../utils/mergeClasses";
import { SERVER_URL } from "../../../../utils/constants";
import useImagePicker from "../hooks/useImagePicker";

const MAX_PHOTOS = 12; // Define the maximum number of photos


function UploadImages() {
  const {handleDragOver,
    handleDrop,
    handleBrowseFiles,
    handleFileChange,
    handleRemoveAll,
    uploadedImages,
    handleRemoveImage,
    errors} = useImagePicker();

  return (
    <section className="">
      <div className="flex justify-between items-center">
        <h3 className="text-lg uppercase font-medium">photos</h3>
        <Button
          intent="iconText"
          size="none"
          className="mb-4 bg-gray-100 px-4 py-1 rounded-full hover:bg-gray-150"
          onClick={handleRemoveAll}
        >
          <FiTrash />
          <span>Remove all</span>
        </Button>
      </div>
      <div>
        <p className="mb-1 mt-2">
          <span>{uploadedImages && uploadedImages.length}</span> of{" "}
          {MAX_PHOTOS} photos
        </p>
        {uploadedImages && uploadedImages.length === 0 &&
          uploadedImages.length < MAX_PHOTOS && (
            <div
              className="border border-dashed rounded-lg p-20 flex flex-col items-center justify-center"
              onDragOver={(e) => handleDragOver(e)}
              onDrop={handleDrop}
              onClick={handleBrowseFiles}
            >
              <MdOutlineAddPhotoAlternate className="text-2xl mb-3" />
              <p className="text-base font-medium">Add photos</p>
              <p className="text-gray-300">or drag and drop</p>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
                multiple
              />
            </div>
          )}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-5">
          {uploadedImages.map((image, index) => (
            <div
              key={index}
              className={cn("relative rounded-lg border border-gray-150", {
                "col-span-2 row-span-2": index === 0,
              })}
            >
              <img
                src={`${SERVER_URL}/images/${image}`}
                alt="uploaded"
                className="w-full aspect-square object-contain "
              />
              <button
                className="absolute top-1 right-1 bg-white p-1 rounded-full"
                onClick={() => handleRemoveImage(index)}
              >
                <FiTrash />
              </button>
            </div>
          ))}
          {uploadedImages.length > 0 && uploadedImages.length < MAX_PHOTOS && (
              <div
                className="border border-dashed rounded-lg p-2 flex w-full h-full flex-col items-center justify-center"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={handleDrop}
                onClick={handleBrowseFiles}
              >
                <MdOutlineAddPhotoAlternate className="text-2xl mb-3" />
                <p className="text-base font-medium">Add photos</p>
                <p className="text-gray-300">or drag and drop</p>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  multiple
                />
              </div>
            )}
        </div>
      </div>
      {errors.images && (
        <p className="text-red-300 text-sm mt-1">{errors.images}</p>
      )}
    </section>
  );
}

export default UploadImages;
