export interface BrandDocument {
    _id: string;
    name: string;
    index: number;
}

export interface SpecDocument {
    _id: string;
    name: string;
    value: string;
}

export type SpecsType = "categories" | "transmission" | "fuelType" | "driveType" | "colorOptions"
