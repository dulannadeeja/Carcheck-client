import { toast } from "react-toastify";
import { useCreateListingMutation } from "../listingApiSlice";
import { listingSchema, ListingSchema } from "../schema/listingSchema";
import { ErrorResponse, useNavigate } from "react-router-dom";
import { getErrors } from "../../../../lib/validation";
import { useDispatch } from "react-redux";
import { clearListing, setDataUpdateFlag, setErrors } from "../listingSlice";
import useInvalidateListings from "../../../../hooks/useInvalidateListings";

type Props = {
    draftId: string
    draftData: ListingSchema
}

function useCreateListing({
    draftData, draftId
}: Props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [createListing] = useCreateListingMutation();
    const invalidateListings = useInvalidateListings();

    const createNewListing = async () => {
        // set the data update flag to false to prevent the data from being saved again
        dispatch(setDataUpdateFlag(false));
        const result = await getErrors(listingSchema, draftData);
        if (!result.isValid) {
            // update the errors in the state
            dispatch(setErrors(result.errors));
            toast.error("Please fill all the required fields");
            return;
        }
        try {
            await createListing({
                data: draftData,
                draftId
            }).unwrap();
            toast.success("Your listing has been listed.");
            // navigate to the listing page
            navigate("/selling/active");
            // clear the draft data
            dispatch(clearListing());
            (await invalidateListings)();
        } catch (err) {
            const error = err as ErrorResponse;
            toast.error(error.data.message || "Failed to list the item");
        }
    };

    return {
        createNewListing
    }
}

export default useCreateListing;