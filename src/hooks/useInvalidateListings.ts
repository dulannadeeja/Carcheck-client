
import { sellerApi } from "../features/Selling/SellerApiSlice";

function useInvalidateListings() {
    const { invalidateTags } = sellerApi.util;

    // This function will invalidate specific tags when called
    const invalidateListings = () => {
        invalidateTags(["Seller", "Drafts", "Active", "Unsold", "Sold"]);
        console.log("Listings invalidated");
    };

    return invalidateListings;
}

export default useInvalidateListings;