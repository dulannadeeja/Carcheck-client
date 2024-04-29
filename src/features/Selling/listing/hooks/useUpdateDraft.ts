import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useUpdateDraftMutation } from "../listingApiSlice";
import { toast } from "react-toastify";
import { ErrorResponse} from "react-router-dom";
import { useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { clearListing, setDataUpdateFlag } from "../listingSlice";
import useInvalidateListings from "../../../../hooks/useInvalidateListings";

type Props = {
    id: string
}

function useUpdateDraft({
    id
}: Props) {
    const dispatch = useDispatch();
    const { data, dataNeedToBeSaved } = useSelector((state: RootState) => state.listing);
    const [updateDraft] = useUpdateDraftMutation();
    const invalidateListings = useInvalidateListings();

    const updateDraftHandler = useCallback(async () => {
        try{
            await updateDraft({
                data,
                id
            }).unwrap();
            toast.success("Changes saved.");
            // navigate to the listing page
            dispatch(clearListing());
            invalidateListings();
        }catch (err) {
            console.error(err);
            const error:ErrorResponse = err as ErrorResponse;
            toast.error(error.data.message || "Failed to update draft");
        }
    }, [data, dispatch, id, invalidateListings, updateDraft]);

    const autoSaveDraft = useCallback(() => {
        updateDraftHandler();
        dispatch(setDataUpdateFlag(false)); 
      }, [dispatch, updateDraftHandler]);
    
      // Debounce the update handler
      const debouncedUpdateDraftHandler = debounce(autoSaveDraft, 5000);
    
      useEffect(() => {
        if (dataNeedToBeSaved) {
          debouncedUpdateDraftHandler();
        }
    
        // Cleanup function to cancel the debounce on component unmount or before re-invoking debounced function on next render
        return () => {
          debouncedUpdateDraftHandler.cancel();
        };
      }, [dataNeedToBeSaved, debouncedUpdateDraftHandler]);

    return {
        updateDraftHandler
    }
}

export default useUpdateDraft;