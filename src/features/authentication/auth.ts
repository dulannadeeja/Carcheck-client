// accountType enum
export enum AccountType {
    buyerPersonal = 'buyer-personal',
    buyerBusiness = 'buyer-business',
    sellerPersonal = 'seller-personal',
    sellerBusiness = 'seller-business',
    serviceProvider = 'service-provider',
    admin = 'admin'
}

// businessType enum
export enum BusinessType {
    SpareParts = "Spare-parts",
    AutomotiveService = "Automotive-service",
    VehicleDealership = "Vehicle-dealership",
    VehicleSeller = "Vehicle-seller",
}

export enum IdentityVerificationDocType {
    nationalId = "national-id",
    passport = "passport",
    drivingLicense = "driving-license",
}

export enum BusinessVerificationDocType {
    businessRegistration = "business-registration",
    bankDocument = "bank-document",
}

// types of ownership of sri lankan businesses
export enum typeOfOwnerships {
    Partnership = "Partnership",
    SoleProprietorship = "Sole-proprietorship",
    Corporation = "Corporation",
    nonProfit = "Non-profit",
    Cooperative = "Cooperative",
    limitedCompany = "Limited-company",
    soleTrader = "Sole-traders",
    merger = "Merger",
    unlimitedLiability = "Unlimited-liability",
}

export const typeOfOwnershipArray: string[] = Object.values(typeOfOwnerships);

export interface User {
    email: string;
    password: string;
    accountType: AccountType;
}

export interface BuyerPersonal extends User {
    accountType: AccountType.buyerPersonal
    firstName: string;
    lastName: string;
}

export interface BuyerBusiness extends User {
    accountType: AccountType.buyerBusiness
    businessName: string;
    buinessType: BusinessType;
}

export interface UserDocs {
    docType: string;
    docName: string;
}

export enum AccountStatus {
    buyingActive = "buying-active",
    sellingActive = "selling-active",
    requestPending = "request-pending",
    docsNeeded = "docs-needed",
    suspended = "suspended",
    sellingRestricted = "selling-restricted",
}

export interface Address {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
}

export interface PersonalInfo {
    drivingLicense?: string;
    nationalId?: string;
    passportNo?: string;
}

export interface BusinessInfo {
    businessName: string;
    businessReqNo: string;
    businessWebsite?: string;
    ownershipType: string;
}

export interface FinancialInfo {
    bankName: string;
    accountNumber: number;
    accountName: string;
    branchCode: string;
}

export interface UserDoc {
    docType: string;
    docName: string;
}

export interface UserDocument {
    _id: string;
    accountType: AccountType;
    phone?: string;
    email: string;
    businessAddress?: Address;
    personalInfo?: PersonalInfo;
    businessInfo: BusinessInfo;
    financialInfo: FinancialInfo;
    firstName: string;
    lastName: string;
    avatar?: string;
    status: AccountStatus;
    userDocs?: UserDoc[];
}



