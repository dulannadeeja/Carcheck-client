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

function AddListing() {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { photos } = data;

  const saveListing = async () => {
    // const formData = new FormData();
    // photos.forEach((image) => {
    //   formData.append("listingImages", image);
    // });
    // const result = await createListing(formData);
    // console.log(result);
  };

  // handle listing submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    console.log("submitting");

    try {
      const result = listingSchema.safeParse(data);

      if (result.success) {
        // Form is valid
        // await handleSignup(result.data);
        console.log("Form is valid");
      } else {
        // Form is invalid, map Zod errors to the state
        dispatch(clearAllErrors());
        console.log("Form is invalid");
        console.log(result.error.issues);
        const newErrors: ListingErrors = { ...errors };
        result.error.issues.forEach((issue: ZodIssue) => {
          if (issue.path.length > 1) {
            const parentKey = issue.path[0] as keyof ListingErrors;
            const parent = newErrors[parentKey];

            // At this point, 'parent' is guaranteed to be an object, so TypeScript should allow spreading it.
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
        result.error.issues.forEach((issue: ZodIssue) => {
          console.log({
            path: issue.path,
            message: issue.message,
          });
        });
        console.log(newErrors);
      }

      // await signup(data).unwrap();
      toast.success("Account created successfully");
      // const response = await signIn(data).unwrap();
      // dispatch(setUser({ ...response }));
      // navigate("/");
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      console.error(errorResponse);
      // toast.error(errorResponse);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-sm h-screen overflow-y-scroll">
      <ContainerSmall>
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
      </ContainerSmall>
    </div>
  );
}

export default AddListing;
