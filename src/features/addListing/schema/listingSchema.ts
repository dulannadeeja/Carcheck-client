import { z } from "zod";
import { Conditions, conditionsArray, DriveTypes, driveTypesArray, fuelTypeArray, FuelTypes, ListingType, listingTypeArray, transmissionArray, Transmissions, vehicleCategoryArray, vehicleMakeArray } from "../listing";

export type ListingErrors = {
    make: string;
    vehicleModel: string;
    manufacturedYear: string;
    registeredYear: string;
    photos: string;
    title: string;
    condition: string;
    mileage: string;
    transmission: string;
    fuelType: string;
    bodyType: string;
    driveType: string;
    numberOfDoors: string;
    numberOfSeats: string;
    exteriorColor: string;
    interiorColor: string;
    numberOfPreviousOwners: string;
    maxFuelConsumption: string;
    minFuelConsumption: string;
    engineCapacity: string;
    description: string;
    listingType: string;
    fixedPrice: string;
    auction: {
        duration: string;
        startingBid: string;
        startDate: string;
        endDate: string;
        reservePrice: string;
        currentBid: string;
        bidders: string;
        maxBid: string;
    }
    location: {
        city: string;
        division: string;
        zipCode: string;
        state: string;
    }
    inspectionReport: string;
    numberOfWatchers: string;
    watchers: string;
    isAllowedOffer: string;
    offer: {
        minimumOffer: string;
        autoAcceptOffer: string;
    }
};

const currentYear = new Date().getFullYear();

const vehicleMakeValidator = z.string().refine(
    (make) => vehicleMakeArray.some((vehicleMake) => vehicleMake.toLowerCase() === make.toLowerCase()),
    {
        message: "Invalid vehicle make. Please select a valid make from the list.",
    }
);

const vehicleCategoryValidator = z.string().refine(
    (category) => vehicleCategoryArray.some((vehicleCategory) => vehicleCategory.toLowerCase() === category.toLowerCase()),
    {
        message: "Invalid vehicle category. Please select a valid category from the list.",
    }
);

const yearValidator = z.number().min(1900, "Year must be 1900 or later.").max(currentYear, `Year cannot exceed the current year (${currentYear}).`);

const photoValidator = z.array(z.instanceof(File)).min(1, "At least one photo is required.");

const auctionSchema = z.object({
    duration: z.number().optional(),
    startingBid: z.number().optional(),
    reservePrice: z.number().optional(),
    currentBid: z.number().optional(),
    bidders: z.array(z.string()).optional(),
    maxBid: z.number().optional(),
    maxBidder: z.string().optional(),
})

const locationSchema = z.object({
    city: z.string({
        required_error: "Please enter a city.",
    }).min(1, "Please enter a city."),
    division: z.string({
        required_error: "Please enter a division.",
    }).min(1, "Please enter a city."),
    zipCode: z.string({
        required_error: "Please enter a zip code.",
    }).min(1, "Please enter a city."),
});

const bodySchema = z.object({
    make: vehicleMakeValidator,
    vehicleModel: z.string(
        {
            required_error: "Please enter a vehicle model.",
        }
    ).min(1, "Please enter a vehicle model."),
    manufacturedYear: yearValidator,
    registeredYear: yearValidator,
    photos: photoValidator,
    title: z.string().min(1, "Title is need to search your listing, please enter your own.").max(80, "Title must be under 80 characters."),
    condition: z.string().refine((condition) => conditionsArray.includes(condition as Conditions), {
        message: "Invalid condition. Please select a valid condition from the list.",
    }),
    mileage: z.number().min(1, "Mileage must be non-negative."),
    transmission: z.string().refine((transmission) => transmissionArray.includes(transmission as Transmissions), {
        message: "Invalid transmission type. Please select a valid type from the list.",
    }),
    fuelType: z.string().refine((fuelType) => fuelTypeArray.includes(fuelType as FuelTypes), {
        message: "Invalid fuel type. Please select a valid type from the list.",
    }),
    bodyType: vehicleCategoryValidator,
    driveType: z.string().refine((driveType) => driveTypesArray.includes(driveType as DriveTypes), {
        message: "Invalid drive type. Please select a valid type from the list.",
    }),
    numberOfSeats: z.string().optional(),
    numberOfDoors: z.string().optional(),
    exteriorColor: z.string().optional(),
    interiorColor: z.string().optional(),
    numberOfPreviousOwners: z.number({
        required_error: "Please enter the number of previous owners.",
    }).min(0, "Number of previous owners must be non-negative."),
    maxFuelConsumption: z.number().min(1, "Maximum fuel consumption must be at least 1 km/L."),
    minFuelConsumption: z.number().min(1, "Minimum fuel consumption must be at least 1 km/L."),
    engineCapacity: z.number().min(600, "Engine capacity must be at least 600cc."),
    description: z.string(
        {
            required_error: "Please enter a description.",
        }
    )
        .min(80, "Description must be at least 80 characters.")
        .max(500, "Description must be under 500 characters."),
    listingType: z.string({
        required_error: "Please select a listing type.",
    }).refine((type) => listingTypeArray.includes(type as ListingType), {
        message: "Invalid listing type. Please select a valid type from the list.",
    }),
    fixedPrice: z.number(
        {
            required_error: "Please enter a fixed price.",
        }
    ).optional(),
    auction: auctionSchema.optional(),
    location: locationSchema,
    inspectionReport: z.string().optional(),
    numberOfWatchers: z.number().optional(),
    watchers: z.array(z.string()).optional(),
    isAllowedOffer: z.boolean().optional().default(false),
    offer: z.object({
        minimumOffer: z.number().optional(),
        autoAcceptOffer: z.number().optional(),
    }).optional()
})
    .refine(({ maxFuelConsumption, minFuelConsumption }) => {
        // If both fields are provided, check that max is >= min
        if (typeof maxFuelConsumption === 'number' && typeof minFuelConsumption === 'number') {
            return maxFuelConsumption >= minFuelConsumption;
        }
        // If either field is not provided, pass the refinement
        return true;
    }, {
        message: "Maximum fuel consumption must be higher than minimum.",
        path: ["maxFuelConsumption"], // Specifying the path helps with error reporting
    })
    .refine(({ manufacturedYear, registeredYear }) => {
        // If both fields are provided, check that max is >= min
        if (typeof manufacturedYear === 'number' && typeof registeredYear === 'number') {
            return manufacturedYear <= registeredYear;
        }
        // If either field is not provided, pass the refinement
        return true;
    }, {
        message: "Registration shoud be same or after the manufacture year.",
        path: ["registeredYear"],
    })

const createListingSchema = bodySchema.superRefine((data, ctx) => {
    if (data.listingType === ListingType.auction && data.auction === undefined) {
        ctx.addIssue({
            path: ["listingType"],
            message: "Auction details are required for auction listings",
            code: z.ZodIssueCode.custom,
        });
    } else if (data.listingType !== ListingType.auction) {
        if (data.auction?.duration !== 0 || data.auction?.startingBid !== 0 || data.auction?.reservePrice !== 0) {
            // Optionally, ensure auction details are only provided for auction listings
            ctx.addIssue({
                path: ["listingType"],
                message: "Auction details should not be provided for non-auction listings",
                code: z.ZodIssueCode.custom,
            });
        }

    }

    // if listing type is auction, auction details are required
    if (data.listingType === ListingType.auction && data.auction) {
        if (data.auction.duration === 0) {
            ctx.addIssue({
                path: ["auction", "duration"],
                message: "Auction duration is required for auction listings",
                code: z.ZodIssueCode.custom,
            });
        }
        if (data.auction.startingBid === 0) {
            ctx.addIssue({
                path: ["auction", "startingBid"],
                message: "Starting bid is required for auction listings",
                code: z.ZodIssueCode.custom,
            });
        }
        if (data.auction.reservePrice === 0) {
            ctx.addIssue({
                path: ["auction", "reservePrice"],
                message: "Reserve price is required for auction listings",
                code: z.ZodIssueCode.custom,
            });
        }
    }

    // if listing type is fixed price, fixed price is required
    if (data.listingType === ListingType.fixedPrice && data.fixedPrice === 0) {
        ctx.addIssue({
            path: ["fixedPrice"],
            message: "Please give a fixed price for the listing",
            code: z.ZodIssueCode.custom,
        });
    }

    // if accepted offer is enabled, minimum offer and auto accept offer are required
    if (data.isAllowedOffer) {
        if (data.offer?.minimumOffer === 0) {
            ctx.addIssue({
                path: ["offer", "minimumOffer"],
                message: "Minimum offer is required",
                code: z.ZodIssueCode.custom,
            });
        }
    }
});

export const validateField = (fieldName: keyof ListingSchema, value: string): undefined | string => {

    let tempObj = {};
    if (fieldName.includes(".")) {
        const [parent, child] = fieldName.split(".");
        tempObj = {
            [parent]: {
                [child]: value
            }
        };
    } else {
        tempObj = { [fieldName]: value };
    }
    try {
        listingSchema.parse(tempObj);
        return undefined;
    } catch (error) {
        if (error instanceof z.ZodError) {
            // we only validate one field, return the message for the first error, if exists
            const firstError = error.errors.find(e => e.path.includes(fieldName as string));
            if (firstError) {
                return firstError ? firstError.message : "Invalid field value";
            }

        }
        return undefined;
    }
}

export const listingSchema = createListingSchema;

export type ListingSchema = z.infer<typeof listingSchema>;