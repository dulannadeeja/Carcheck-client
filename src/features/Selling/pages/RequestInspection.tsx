import { ErrorResponse, Link, useNavigate, useParams } from "react-router-dom";
import ContainerSmall from "../../../components/ui/ContainerSmall";
import logo from "../../../assets/brand/logo.svg";
import Button from "../../../components/ui/Button";
import { useState } from "react";
import Calendar from "../components/Calendar";
import TimePicker from "../components/TimePicker";
import VehicleDetails from "../components/VehicleDetails";
import SelectServiceProvider from "../components/SelectServiceProvider";
import ContactDetails from "../components/ContactDetails";
import { inspectionRequestSchema } from "../schema/inspectionRequest.schema";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ZodIssue } from "zod";
import { clearAllErrors, setErrors } from "../inspectionReqSlice";
import { useCreateInspectionRequestMutation } from "../inspectionReqApiSlice";
import { useGetListingQuery } from "../listing/listingApiSlice";

function RequestInspection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listingId = useParams<{ listingId: string }>().listingId;

  if (!listingId) {
    navigate("/");
  }

  const { data, isSuccess } = useGetListingQuery(listingId as string);
  const [createInspectionRequest] = useCreateInspectionRequestMutation();
  const {
    serviceProvider,
    serviceBranch,
    inspectionDate,
    contactNumber,
    inspectionTime,
    errors,
  } = useSelector((state: RootState) => state.inspectionReq);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const valid = await validateData();
      if (valid) {
        // Submit the inspection request
        const result = await createInspectionRequest({
          listing: listingId as string,
          serviceProvider,
          serviceBranch,
          inspectionDate: inspectionDate as Date,
          inspectionTime: inspectionTime as Date,
          contactNumber,
        }).unwrap();
        console.log(result);
        toast.success("Inspection has been scheduled.");
      }
    } catch (error) {
      console.log(error);
      handleSubmissionError(error as ErrorResponse);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle submission error
  const handleSubmissionError = (error: ErrorResponse) => {
    const errorResponse = error as ErrorResponse;
    console.error(errorResponse);
    toast.error(errorResponse.data);
  };

  // Validate data
  const validateData = async () => {
    const result = inspectionRequestSchema.safeParse({
      listing: listingId,
      serviceProvider,
      serviceBranch,
      inspectionDate,
      contactNumber,
      inspectionTime,
    }) as { 
      success: boolean; 
      error: { issues: ZodIssue[] },
      data: typeof data
   };
    if (!result.success) {
      toast.error(
        "There are some errors in your listing. Please fix them before submitting."
      );
      console.log(result.error.issues);
      handleValidationErrors(result.error.issues);
      return false;
    }
    return true;
  };

  // Handle validation errors
  const handleValidationErrors = (issues: ZodIssue[]) => {
    dispatch(clearAllErrors());
    const newErrors: typeof errors = { ...errors };
    issues.forEach((issue) => {
      const key = issue.path[0] as keyof typeof errors;
      newErrors[key] = issue.message as never;
    });
    dispatch(setErrors(newErrors));
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
          {isSuccess && data && (
            <>
              <div className="flex flex-col gap-10">
                <VehicleDetails listing={data.data} />
                <SelectServiceProvider />
                <Calendar />
                <TimePicker />
                <ContactDetails />
              </div>
              <div className="flex flex-col gap-3 md:w-60 mx-auto mb-40">
                <Button
                  intent="primary"
                  className="rounded-full"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Schedule Inspection"}
                </Button>
                <Button intent="secondary" className="rounded-full">
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </ContainerSmall>
    </div>
  );
}

export default RequestInspection;
