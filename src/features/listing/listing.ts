export type listingType = {
    _id: string;
    title: string;
    price: number;
    mileage: number;
    manufacturedYear: number;
    make: string;
    condition: string;
    isOffersEligible: boolean;
    listingType: "fixed-vehicle" | "fixed-sparepart" | "auction-vehicle" | "auction-sparepart";
    city: string;
    division: string;
    watchers: number;
    seller: {
      username: string;
      feedbacks: number;
      precentage: number;
      isVerifiedBusiness: boolean;
    };
    auction: {
      isAuction: boolean;
      bidders: number;
      endDateTime: string;
      currentBid: number;
      startingBid: number;
      reservePrice: number;
      isReserveEligible: boolean;
    };
    sparepart: {
        isSparepart: boolean;
        warrenty: string;
        isPickupEligible: boolean;
        soldCount: number;
        isAllMostGone: boolean;
        isFreeReturnEligible: boolean;
        isFreeDeliveryEligible: boolean;
        };
    description: string;
    createdAt: string;
    images: string[];
}

export const isNewListing = (createdAt: Date) => {
    const now = new Date();
    const timeDifference = now.getTime() - createdAt.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference < 48;
}

