import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useUpdateListingMutation } from "../listingApiSlice";
import { toast } from "react-toastify";
import { ErrorResponse, useNavigate } from "react-router-dom";
import { useCallback} from "react";
import { listingSchema } from "../schema/listingSchema";
import { getErrors } from "../../../../lib/validation";
import { clearListing, setErrors } from "../listingSlice";
import useInvalidateListings from "../../../../hooks/useInvalidateListings";

type Props = {
    id: string
}

function useUpdateListing({
    id
}: Props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data} = useSelector((state: RootState) => state.listing);
    const [updateListing] = useUpdateListingMutation();
    const invalidateListings = useInvalidateListings();

    const updateListingHandler = useCallback(async () => {
        try{

            // validate the data before updating
            const result = await getErrors(listingSchema, data);

            if(!result.isValid){
                dispatch(setErrors(result.errors));
                toast.error("Please fill all the required fields");
                return;
            }

            await updateListing({
                data,
                id
            }).unwrap();
            toast.success("Listing updated successfully");
            // navigate to the listing page
            navigate(`/listing/${id}`);
            dispatch(clearListing());
            invalidateListings();
        }catch (err) {
            console.error(err);
            const error:ErrorResponse = err as ErrorResponse;
            toast.error(error.data.message || "Failed to update draft");
        }
    }, [data, dispatch, id, invalidateListings, navigate, updateListing]);

    return {
        updateListingHandler
    }
}

export default useUpdateListing;