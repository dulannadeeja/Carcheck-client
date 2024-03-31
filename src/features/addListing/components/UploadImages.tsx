import React, { useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Button from "../../../components/ui/Button";
import { FiTrash } from "react-icons/fi";
import { cn } from "../../../utils/mergeClasses";

const MAX_PHOTOS = 12; // Define the maximum number of photos

function UploadImages() {
  const [droppedImages, setDroppedImages] = useState<File[]>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);

    // Filter only image files
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (droppedImages.length + imageFiles.length <= MAX_PHOTOS) {
      setDroppedImages([...droppedImages, ...imageFiles]);
    } else {
      // get only the first few images that can be added
      const remainingSlots = MAX_PHOTOS - droppedImages.length;
      const remainingImages = imageFiles.slice(0, remainingSlots);
      setDroppedImages([...droppedImages, ...remainingImages]);
    }
  };

  const handleBrowseFiles = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Filter only image files
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));

      if (droppedImages.length + imageFiles.length <= MAX_PHOTOS) {
        setDroppedImages((prevImages) => [...prevImages, ...imageFiles]);
      } else {
        // get only the first few images that can be added
        const remainingSlots = MAX_PHOTOS - droppedImages.length;
        const remainingImages = imageFiles.slice(0, remainingSlots);
        setDroppedImages((prevImages) => [...prevImages, ...remainingImages]);
      }
    }
  };

  const handleRemoveAll = () => {
    setDroppedImages([]);
  };

  return (
    <section className="my-10">
      <div className="flex justify-between items-center">
        <h3 className="text-lg uppercase font-medium my-4">photos</h3>
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
        <p className="mb-1">
          <span>{droppedImages.length}</span> of {MAX_PHOTOS} photos
        </p>
        {droppedImages.length === 0 && (
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
          {droppedImages.map((image, index) => (
            <div
              key={index}
              className={cn("relative rounded-lg border border-gray-150", {
                "col-span-2 row-span-2": index === 0,
              })}
            >
              <img
                src={URL.createObjectURL(image)}
                alt="uploaded"
                className="w-full aspect-square object-contain "
              />
              <button className="absolute top-1 right-1 bg-white p-1 rounded-full">
                <FiTrash />
              </button>
            </div>
          ))}
          {droppedImages.length > 0 && droppedImages.length < MAX_PHOTOS && (
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
    </section>
  );
}

export default UploadImages;
