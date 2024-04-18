import { useCallback, useEffect, useRef, useState } from "react";
import { SERVER_URL } from "../../../../utils/constants";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Button from "../../../../components/ui/Button";
import { FaFileImage, FaRegFilePdf } from "react-icons/fa";
import { cn } from "../../../../utils/mergeClasses";

type UploadFileProps = {
  onSuccessfulUpload: (name: string) => void;
  onUploadError: (error: string) => void;
  onRemove: () => void;
  error: string;
  setError: (error: string) => void;
};

function UploadFile({
  onSuccessfulUpload,
  onUploadError,
  onRemove,
  error,
  setError,
}: UploadFileProps) {
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSubmit = useCallback(async () => {
    const formData = new FormData();
    if (!droppedFile) return;

    const xhr = new XMLHttpRequest();

    console.log(droppedFile.type);

    if (droppedFile.type === "application/pdf") {
      formData.append("pdf-files", droppedFile);
      xhr.open("POST", `${SERVER_URL}/resource/pdf`);
    } else if (droppedFile.type.startsWith("image/")) {
      formData.append("image-files", droppedFile);
      xhr.open("POST", `${SERVER_URL}/resource/image`);
    } else {
      setError("Only image files and pdf files are allowed");
      setDroppedFile(null);
      return;
    }

    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        const percentage = Math.round((event.loaded * 100) / event.total);
        setUploadPercentage(percentage); // Update state with the latest percentage
      }
    };

    xhr.onload = function () {
      if (xhr.status === 201) {
        setUploadPercentage(100); // Ensure the progress bar shows fully completed
        // convert the response to json
        const response = JSON.parse(xhr.response);
        onSuccessfulUpload(response.fileNames[0]);
      } else {
        onUploadError("Server error during file upload");
        setUploadPercentage(0); // Reset progress bar on error
      }
    };

    xhr.onerror = function () {
      onUploadError("Network error during file upload");
      setUploadPercentage(0); // Reset progress bar on network error
    };

    xhr.send(formData);
  }, [droppedFile, onSuccessfulUpload, onUploadError, setError]);

  useEffect(() => {
    if (droppedFile) {
      handleFileSubmit();
    }
  }, [droppedFile, handleFileSubmit]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      setError("Only image files and pdf files are allowed");
      setDroppedFile(null);
      return;
    }
    setDroppedFile(file);
  };

  // click on the div to trigger file input
  const handleBrowseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (!file) return;

      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        setError("Only image files and pdf files are allowed");
        setDroppedFile(null);
        return;
      }
      setDroppedFile(file);
    }
  };

  const removeFileHandler = () => {
    setDroppedFile(null);
    setUploadPercentage(0);
    onRemove();
  };

  return (
    <div className="max-w-sm">
      <div
        className={cn(
          "border cursor-pointer border-gray-300 mb-5 gap-5 border-dashed rounded-lg p-3 flex w-full h-full items-center justify-center",
          {
            "opacity-60": droppedFile,
            "border-red-300": error,
          }
        )}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={handleDrop}
        onClick={handleBrowseFiles}
      >
        <MdOutlineAddPhotoAlternate className="text-2xl mb-3" />
        <div>
          <p className="text-base font-medium mb-1">
            Drag your files here or{" "}
            <span className="text-blue-300 font-medium">browse</span>
          </p>
          <p className="text-gray-300 ">
            Supported file types: JPG, PNG, GIF, TIFF, PDF
          </p>
          <p className="text-gray-300">The file size can be up to 25MB</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple
          />
        </div>
      </div>
      {error && <p className="text-red-300 text-sm">{error}</p>}
      {droppedFile && (
        <div>
          {/* file view */}
          <div className="flex items-center justify-between bg-gray-100 p-3">
            <div className="flex items-center gap-3">
              {droppedFile.type === "application/pdf" ? (
                <FaRegFilePdf className="text-4xl" />
              ) : (
                <FaFileImage className="text-4xl" />
              )}
              <p>{droppedFile.name}</p>
            </div>
            <Button
              intent="iconText"
              className="text-sm text-red-300"
              onClick={removeFileHandler}
            >
              Remove
            </Button>
          </div>
          {/* Progress Bar */}
          <div className="w-full rounded-full h-2 bg-gray-200">
            <div
              className="bg-blue-300 h-2 rounded-full"
              style={{ width: `${uploadPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadFile;
