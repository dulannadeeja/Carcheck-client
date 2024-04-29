
export enum Conditions {
    brandNew = 'Brand New',
    preOwned = 'Pre-Owned',
    unregistered = 'Unregistered'
}


export enum ListingTypes {
    fixedPrice = 'Fixed Price',
    auction = 'Auction'
}

export enum ListingStates {
    draft = 'Draft',
    active = 'Active',
    unsold = 'Unsold',
    sold = 'Sold'
}

export interface Vehicle {
    _id: string;
    make: {
        _id: string;
        name: string;
    }
    vehicleModel: string;
    category: string[];
    createdAt: Date;
    updatedAt: Date;
}

export const capacityOptions = [
    {
        name: "600cc or 0.6L",
        value: "600",
    },
    {
        name: "800cc or 0.8L",
        value: "800",
    },
    {
        name: "1000cc or 1L",
        value: "1000",
    },
    {
        name: "1300cc or 1.3L",
        value: "1300",
    },
    {
        name: "1500cc or 1.5L",
        value: "1500",
    },
    {
        name: "1800cc or 1.8L",
        value: "1800",
    },
    {
        name: "2000cc or 2L",
        value: "2000",
    },
    {
        name: "2500cc or 2.5L",
        value: "2500",
    },
    {
        name: "3000cc or 3L",
        value: "3000",
    },
    {
        name: "3500cc or 3.5L",
        value: "3500",
    },
    {
        name: "4000cc or 4L",
        value: "4000",
    },
    {
        name: "4500cc or 4.5L",
        value: "4500",
    },
    {
        name: "5000cc or 5L",
        value: "5000",
    },
    {
        name: "5500cc or 5.5L",
        value: "5500",
    },
    {
        name: "6000cc or 6L",
        value: "6000",
    },
    {
        name: "6500cc or 6.5L",
        value: "6500",
    },
    {
        name: "7000cc or 7L",
        value: "7000",
    },
    {
        name: "7500cc or 7.5L",
        value: "7500",
    },
    {
        name: "8000cc or 8L",
        value: "8000",
    }

];

export const numberOfSeatsOptions = [
    {
        name: "2 Seater",
        value: "2",
    },
    {
        name: "4 Seater",
        value: "4",
    },
    {
        name: "5 Seater",
        value: "5",
    },
    {
        name: "7 Seater",
        value: "7",
    },
    {
        name: "9 Seater",
        value: "9",
    },
    {
        name: "More than 9 Seater",
        value: "More than 9",
    }
]

export const numberOfDoorsOptions = [
    {
        name: "2 Doors",
        value: "2"
    },
    {
        name: "3 Doors",
        value: "3"
    },
    {
        name: "4 Doors",
        value: "4"
    },
    {
        name: "5 Doors",
        value: "5"
    }

]


export const numberOfPreviousOwnersOptions = [
    {
        name: "unregistered",
        value: 0
    },
    {
        name: "1st Owner",
        value: 1
    },
    {
        name: "2nd Owner",
        value: 2
    },
    {
        name: "3rd Owner",
        value: 3
    },
    {
        name: "4th Owner",
        value: 4
    },
    {
        name: "5th Owner",
        value: 5
    },
    {
        name: "6th Owner",
        value: 6
    },
    {
        name: "7th Owner",
        value: 7
    },
    {
        name: "8th Owner",
        value: 8
    },
    {
        name: "9th Owner",
        value: 9
    },
    {
        name: "10th Owner",
        value: 10
    }
]

export const auctionDurationOptionsArray = [
    {
        name: "5 Days",
        value: 5
    },
    {
        name: "7 Days",
        value: 7
    },
    {
        name: "10 Days",
        value: 10
    },
    {
        name: "14 Days",
        value: 14
    },
    {
        name: "21 Days",
        value: 21
    },
    {
        name: "30 Days",
        value: 30
    }
]

export const conditionsArray = Object.values(Conditions);


export enum ListingActions {
    NEW = "new",
    DRAFT = "draft",
    UPDATE = "update",
  }


export type GetSellerListingType = {
    _id: string,
    status: string,
    condition: string,
    images: string[],
    title: string,
    make: string,
    vehicleModel: string,
    manufacturedYear: number,
    registeredYear: number,
    mileage: number,
    transmission: string,
    fuelType: string,
    bodyType: string,
    driveType: string,
    numberOfDoors: number,
    numberOfSeats: number,
    exteriorColor: string,
    interiorColor: string,
    numberOfPreviousOwners: number,
    engineCapacity: number,
    description: string,
    listingType: string,
    fixedPrice: number,
    auction: Auction,
    location: Location,
    isAllowedOffer: boolean,
    offer: Offer,
    sellerType: string;
    draftCreatedAt: Date;
    draftUpdatedAt: Date;
    publishedAt: Date;
    endDate: Date;
    currentPrice: number;
    updatedAt: Date;
    createdAt: Date;
}

export type GetDraftListingType = {
    _id: string,
    status: string,
    condition?: string,
    images?: string[],
    title?: string,
    make?: string,
    vehicleModel?: string,
    manufacturedYear?: number,
    registeredYear?: number,
    mileage?: number,
    transmission?: string,
    fuelType?: string,
    bodyType?: string,
    driveType?: string,
    numberOfDoors?: number,
    numberOfSeats?: number,
    exteriorColor?: string,
    interiorColor?: string,
    numberOfPreviousOwners?: number,
    engineCapacity?: number,
    description?: string,
    listingType?: string,
    fixedPrice?: number,
    auction?: Auction,
    location?: Location,
    isAllowedOffer?: boolean,
    offer?: Offer,
    sellerType?: string;
    draftCreatedAt: Date;
    draftUpdatedAt: Date;
    publishedAt?: Date;
    endDate?: Date;
    currentPrice?: number;
    updatedAt: Date;
    createdAt: Date;
}

export interface Auction {
    duration: number;
    startingBid: number;
    reservePrice: number;
    startingDate: Date;
    bids: BidDetails[];
    maxBid: number;
    maxBidder: string;
}

export interface Location {
    city: string;
    division: string;
    zipCode: string;
}

export interface Offer {
    minimumOffer: number;
    autoAcceptOffer: number;
}

interface BidDetails {
    _id: string,
    listing: string,
    bidder: string,
    amount: number,
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export type GetSingleListingResposeType = {
    data: GetSellerListingType,
    message: string,
    statusCode: number,
    success: boolean
}

export type GetSellerListingResponseType = {
    data: GetSellerListingType[],
    message: string,
    statusCode: number,
    success: boolean
    page: number,
    total: number,
    totalPages: number
}

export type ImageResponse = {
        fileNames: string[];
        message: string;
};


