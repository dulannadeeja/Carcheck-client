import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { updateAndValidateFieldHandler } from "../listingSlice";
import { toast } from "react-toastify";
import { useUploadImagesMutation } from "../listingApiSlice";

const MAX_PHOTOS = 12; // Define the maximum number of photos



function useImagePicker() {
    const [uploadImages] = useUploadImagesMutation();
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const dispatch = useDispatch();
    const { errors, data } = useSelector((state: RootState) => state.listing);

    // set images from the draft data
    useEffect(()=>{
        if(data.images.length > 0){
            setUploadedImages(data.images);
        }else{
            setUploadedImages([]);
        }
    }, [data.images])

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleFilesReceived = async (files: File[]) => {

        // Filter only image files
        const imageFiles = files.filter((file) => file.type.startsWith("image/"));

        // Check if the user has reached the maximum number of photos
        const remainingSlots = uploadedImages ? MAX_PHOTOS - uploadedImages.length : MAX_PHOTOS;

        try{
            if(remainingSlots <= 0){
                toast.error("You have reached the maximum number of photos");
                return;
            }
    
            // get only the first few images that can be added
            const remainingImages = imageFiles.slice(0, remainingSlots);
        
            const uploaded = await uploadImagesHandler(remainingImages);
            console.log("fileNames", uploaded);
            const allImages = [
                ...(uploadedImages ? uploadedImages : []),
                ...(uploaded ? uploaded : [])
            ]
            console.log("allImages", allImages);
            dispatch(updateAndValidateFieldHandler({ field: "images", value: allImages }));
        }catch(err){
            console.error(err);
            toast.error("Failed to upload images");
        }
    }

    const uploadImagesHandler = async (files:File[]) => {
        if (!files) return;

        try {
            const formData = new FormData();
            files.forEach((image) => {
                formData.append("listing_images", image);
            });
            const result = await uploadImages(formData).unwrap();
            return result.fileNames;
        } catch (err) {
            throw new Error(err as string);
        }
    }

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const files = Array.from(e.dataTransfer.files);
        handleFilesReceived(files);
        
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
            handleFilesReceived(files);
        }
    };

    const handleRemoveAll = () => {
        setUploadedImages([]);
        dispatch(updateAndValidateFieldHandler({ field: "images", value: [] }));
    };

    const handleRemoveImage = (index: number) => {
        const images = uploadedImages.filter((_, i) => i !== index);
        setUploadedImages(images);
        dispatch(updateAndValidateFieldHandler({ field: "images", value: images }));
    };

    return {
        handleDragOver,
        handleDrop,
        handleBrowseFiles,
        handleFileChange,
        handleRemoveAll,
        uploadedImages,
        errors,
        handleRemoveImage
    };
}

export default useImagePicker;