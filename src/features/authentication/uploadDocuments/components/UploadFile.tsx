import { useState } from "react";
import { SERVER_URL } from "../../../../utils/constants";

function UploadFile() {
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("pdf-files", file);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", `${SERVER_URL}/resource/pdf`); // API endpoint where Multer is configured
    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        const percentage = Math.round((event.loaded * 100) / event.total);
        setUploadPercentage(percentage); // Update state with the latest percentage
      }
    };

    xhr.onload = function () {
      if (xhr.status === 201) {
        console.log("File uploaded successfully");
        setUploadPercentage(100); // Ensure the progress bar shows fully completed
      } else {
        console.error("Error uploading file");
        setUploadPercentage(0); // Reset progress bar on error
      }
    };

    xhr.onerror = function () {
      console.error("Error during the upload process.");
      setUploadPercentage(0); // Reset progress bar on network error
    };

    xhr.send(formData);
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} className="mb-2" />
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${uploadPercentage}%` }}
        ></div>
      </div>
      <div className="text-gray-700 text-sm font-medium mt-2">
        Uploaded: {uploadPercentage}%
      </div>
    </div>
  );
}

export default UploadFile;
