export interface BidResponseData {
    _id: string;
    listing: string;
    bidder: string;
    amount: number;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type BidInputData = {
    listingId: string;
    bidAmount: number;
}

export type BidResponse = {
    data: BidResponseData;
    message: string;
    success: boolean;
}