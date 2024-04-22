import logo from "../../../../assets/brand/logo.svg";
import { ErrorResponse, Link, useParams } from "react-router-dom";
import UploadImages from "../components/UploadImages";
import Title from "../components/Title";
import VehicleItemSpecifics from "../components/VehicleItemSpecifics";
import ContainerSmall from "../../../../components/ui/ContainerSmall";
import Description from "../components/Description";
import Condition from "../components/Condition";
import ListingFormatAndPricing from "../components/ListingFormatAndPricing";
import Button from "../../../../components/ui/Button";
import { ListingErrors, listingSchema } from "../schema/listingSchema";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { clearAllErrors, setDraftData, setErrors } from "../listingSlice";
import { ZodIssue } from "zod";
import ItemLocation from "../components/ItemLocation";
import PredictedPrice from "../components/PredictedPrice";
import {
  useCreateListingMutation,
  useGetListingQuery,
  useUpdateListingMutation,
  useUploadImagesMutation,
} from "../listingApiSlice";
import { ListingAction } from "../listing";
import { ListingState } from "../../../listing/listing";

enum Operations {
  LIST_NEW = "list-new",
  LIST_DRAFT = "list-draft",
  UPDATE_ACTIVE_LISTING = "update-active-listing",
  UPDATE_DRAFT_LISTING = "update-draft-listing",
  SAVE_NEW_DRAFT = "save-new-draft",
}

function AddListing() {
  const { listingId, action } = useParams<{
    listingId: string;
    action: ListingAction;
  }>();
  const { data: draftData, isLoading } = useGetListingQuery(
    listingId as string
  );
  const dispatch = useDispatch();
  const [createListing] = useCreateListingMutation();
  const [uploadImages] = useUploadImagesMutation();
  const [updateListing] = useUpdateListingMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, errors, uploadFiles, uploadedImages } = useSelector(
    (state: RootState) => state.listing
  );
  const { images } = data;

  useEffect(() => {
    if (listingId && draftData) {
      dispatch(setDraftData(draftData));
    }
  }, [listingId, draftData, dispatch]);

  const handleNewListing = async (allListingImages: string[]) => {
    try {
      return await createListing({
        ...data,
        images: allListingImages,
        status: ListingState.active,
      });
    } catch (error) {
      handleSubmissionError(error as ErrorResponse);
    }
  };

  const handleSaveNewDraft = async (allListingImages: string[]) => {
    try {
      return await createListing({
        ...data,
        images: allListingImages,
        status: ListingState.draft,
      });
    } catch (error) {
      handleSubmissionError(error as ErrorResponse);
    }
  };

  const handleUpdate = async (
    allListingImages: string[],
    operation: Operations
  ) => {
    let status: ListingState = ListingState.active;

    switch (operation) {
      case Operations.UPDATE_ACTIVE_LISTING:
        status = ListingState.active;
        break;
      case Operations.UPDATE_DRAFT_LISTING:
        status = ListingState.draft;
        break;
      case Operations.LIST_DRAFT:
        status = ListingState.active;
        break;
    }

    try {
      return await updateListing({
        data: {
          ...data,
          images: allListingImages,
          status,
        },
        id: listingId as string,
      });
    } catch (error) {
      handleSubmissionError(error as ErrorResponse);
    }
  };

  const performOperation = async (operation: Operations) => {
    setIsSubmitting(true);
    try {
      // validate all the fileds
      const valid = await validateData();
      if (!valid) {
        return;
      }
      // upload all the new images
      let response: ImageResponse | false = false;
      if (uploadFiles.length > 0) {
        response = await uploadImagesHandler();
      }

      const allListingImages = response
        ? [...uploadedImages, ...response.data.fileNames]
        : images;

      // submit the listing data
      if (operation === Operations.LIST_NEW) {
        await handleNewListing(allListingImages);
      }
      if (operation === Operations.SAVE_NEW_DRAFT) {
        await handleSaveNewDraft(allListingImages);
      }
      if (operation === Operations.LIST_DRAFT) {
        await handleUpdate(allListingImages, operation);
      }
      if (operation === Operations.UPDATE_ACTIVE_LISTING) {
        await handleUpdate(allListingImages, operation);
      }
      if (operation === Operations.UPDATE_DRAFT_LISTING) {
        await handleUpdate(allListingImages, operation);
      }

      console.log(response);

      toast.success("Listing saved successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save listing.");
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
    uploadFiles.forEach((image) => {
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
          {!isLoading && draftData && (
            <UploadImages images={draftData.images} />
          )}
          {isLoading || (!draftData && <UploadImages images={[]} />)}
          <Title />
          <Condition />
          <VehicleItemSpecifics />
          <Description />
          {/* <PredictedPrice /> */}
          <ListingFormatAndPricing />
          <ItemLocation />
          <div className="flex flex-col gap-3 md:w-60 mx-auto mb-40">
            {action === ListingAction.NEW && (
              <>
                <Button
                  intent="primary"
                  className="rounded-full"
                  onClick={() => performOperation(Operations.LIST_NEW)}
                  disabled={isSubmitting}
                >
                  List Item
                </Button>
                <Button
                  intent="secondary"
                  className="rounded-full"
                  onClick={() => performOperation(Operations.SAVE_NEW_DRAFT)}
                >
                  Save Draft
                </Button>
              </>
            )}
            {action === ListingAction.DRAFT && (
              <>
                <Button
                  intent="primary"
                  className="rounded-full"
                  onClick={() => performOperation(Operations.LIST_DRAFT)}
                  disabled={isSubmitting}
                >
                  List Item
                </Button>
                <Button
                  intent="secondary"
                  className="rounded-full"
                  onClick={() =>
                    performOperation(Operations.UPDATE_DRAFT_LISTING)
                  }
                >
                  Save Draft
                </Button>
              </>
            )}
            {action === ListingAction.UPDATE && (
              <Button
                intent="primary"
                className="rounded-full"
                onClick={() =>
                  performOperation(Operations.UPDATE_ACTIVE_LISTING)
                }
                disabled={isSubmitting}
              >
                Save Changes
              </Button>
            )}
            <Button intent="secondary" className="rounded-full">
              Preview Listing
            </Button>
          </div>
        </div>
      </ContainerSmall>
    </div>
  );
}

export default AddListing;
