import logo from "../../../assets/brand/logo.svg";
import { ErrorResponse, Link } from "react-router-dom";
import UploadImages from "../components/UploadImages";
import Title from "../components/Title";
import VehicleItemSpecifics from "../components/VehicleItemSpecifics";
import ContainerSmall from "../../../components/ui/ContainerSmall";
import Description from "../components/Description";
import Condition from "../components/Condition";
import ListingFormatAndPricing from "../components/ListingFormatAndPricing";
import Button from "../../../components/ui/Button";
import { ListingErrors, listingSchema } from "../schema/listingSchema";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { clearAllErrors, setErrors } from "../listingSlice";
import { ZodIssue } from "zod";
import ItemLocation from "../components/ItemLocation";
import PredictedPrice from "../components/PredictedPrice";
import {
  useCreateListingMutation,
  useUploadImagesMutation,
} from "../listingApiSlice";

function AddListing() {
  const dispatch = useDispatch();
  const [createListing] = useCreateListingMutation();
  const [uploadImages] = useUploadImagesMutation(); // Remove 'data' and 'error' from the destructured array
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { images } = data;

  // handle listing submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const valid = await validateData();
      if (valid) {
        const response: ImageResponse | false = await uploadImagesHandler();
        if (response) {
          await submitListingData(response);
        }
      }
    } catch (error) {
      handleSubmissionError(error as ErrorResponse);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validate data
  const validateData = async () => {
    const result = listingSchema.safeParse(data);
    if (!result.success) {
      toast.error(
        "There are some errors in your listing. Please fix them before submitting."
      );
      handleValidationErrors(result.error.issues);
      return false;
    }
    return true;
  };

  type ImageResponse = {
    data: {
      fileNames: string[];
      message: string;
    };
  };

  // Upload images
  const uploadImagesHandler = async () => {
    toast.success("Saving images...");
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("listing_images", image);
    });
    const response: ImageResponse = (await uploadImages(
      formData
    )) as ImageResponse;
    if (response.data.fileNames.length > 0) {
      toast.success("Images uploaded successfully");
      return response;
    } else {
      toast.error("Failed to upload images.");
      return false;
    }
  };

  // Submit listing data
  const submitListingData = async (response: ImageResponse) => {
    toast.success("Saving listing...");
    await createListing({
      ...data,
      images: response.data.fileNames,
    });
  };

  // Handle validation errors
  const handleValidationErrors = (issues: ZodIssue[]) => {
    dispatch(clearAllErrors());
    const newErrors: ListingErrors = { ...errors };
    issues.forEach((issue) => {
      if (issue.path.length > 1) {
        const parentKey = issue.path[0] as keyof ListingErrors;
        const parent = newErrors[parentKey];
        const updatedParent = {
          ...(parent as object),
          [issue.path[1]]: issue.message,
        };

        newErrors[parentKey] = updatedParent as never;
      } else {
        const key = issue.path[0] as keyof ListingErrors;
        newErrors[key] = issue.message as never;
      }
    });
    dispatch(setErrors(newErrors));
  };

  // Handle submission error
  const handleSubmissionError = (error: ErrorResponse) => {
    const errorResponse = error as ErrorResponse;
    console.error(errorResponse);
    toast.error(errorResponse.data);
  };

  return (
    <div className="text-sm h-screen overflow-y-scroll">
      <ContainerSmall>
        <div className="flex flex-col w-full gap-16">
          <div className="flex justify-center my-5">
            <Link to="/">
              <img src={logo} alt="logo" className="w-40" />
            </Link>
          </div>
          <hr />
          <UploadImages />
          <Title />
          <Condition />
          <VehicleItemSpecifics />
          <Description />
          <PredictedPrice />
          <ListingFormatAndPricing />
          <ItemLocation />
          <div className="flex flex-col gap-3 md:w-60 mx-auto mb-40">
            <Button
              intent="primary"
              className="rounded-full"
              onClick={() => handleSubmit()}
            >
              {isSubmitting ? "Submitting..." : "Submit Listing"}
            </Button>
            <Button intent="secondary" className="rounded-full">
              Preview Listing
            </Button>
            <Button intent="secondary" className="rounded-full">
              Save Draft
            </Button>
          </div>
        </div>
      </ContainerSmall>
    </div>
  );
}

export default AddListing;
