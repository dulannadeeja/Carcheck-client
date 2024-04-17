
import { z } from 'zod';
import { AccountType, typeOfOwnerships } from '../../auth';

export enum VerificationType {
    email = 'email',
    phone = 'phone'
}

export const personalInfoSchema = z.object({
    firstName: z.string().min(1, "Please enter the first name."),
    lastName: z.string().min(1, "Please enter the last name."),
    drivingLicense: z.string().optional().refine(
        (drivingLicense) => {
            if (!drivingLicense) return true;
            else {
                const regex = /^[A-Za-z]\d{6}$/;
                return regex.test(drivingLicense);
            }
        },
        {
            message: "Looks like the driving license is invalid, double check the number"
        }

    ),
    nationalId: z.string().min(1, "Please enter the national ID.").refine(
        (nationalId) => {
            const oldFormatRegex = /^\d{9}[Vv]$/;
            const newFormatRegex = /^\d{12}$/;

            return oldFormatRegex.test(nationalId) || newFormatRegex.test(nationalId);
        },
        {
            message: "Looks like the national ID is invalid, double check the number"
        }
    ),
    passportNo: z.string().optional().refine(
        (passportNo) => {
            if (!passportNo) return true;
            else {
                const regex = /^[A-Za-z]\d{7}$/;
                return regex.test(passportNo);
            }
        },
        {
            message: "Looks like the passport number is invalid, double check the number"
        }

    ),
})

export const businessAddressSchema = z.object({
    street: z.string().min(1, "Please enter the street and no."),
    streetLine2: z.string().optional(),
    city: z.string().min(1, "Please enter the city."),
    division: z.string().min(1, "Please enter the division."),
    zip: z.string().min(1, "Please enter the zip code.").refine((zip) => zip.match(/^[0-9]+$/), {
        message: "Please enter a valid zip code."
    }),
})

export const businessInfoSchema = z.object({
    businessName: z.string().min(1, "Please enter the business name."),
    businessRegNo: z.string().min(1, "Please enter the business registration number."),
    businessWebsite: z.string().optional().refine(
        (website) => {
            if (!website) return true;
            // check if a valid url is entered using regex
            const regex = /^(http|https):\/\/[^ "]+$/;
            return regex.test(website);
        },
        {
            message: "Looks like the website is invalid, double check the URL."
        }
    ),
    ownershipType: z.string().min(1, "Please select the ownership type."),
})

export const financialInfoSchema = z.object({
    bankName: z.string().refine((bankName) => {
        if (!bankName) return true;
        return bankName.match(/^[A-Za-z\s]+$/);
    }, {
        message: "Looks like the bank name is invalid, double check the name."
    }),
    accountName: z.string().refine((accountName) => {
        if (!accountName) return true;
        return accountName.match(/^[A-Za-z\s]+$/);
    }, {
        message: "Looks like the account name is invalid, double check the name."
    }),
    accountNumber: z.string().refine((accountNumber) => {
        if (!accountNumber) return true;
        return accountNumber.match(/^[0-9]+$/);
    }, {
        message: "Looks like the account number is invalid, double check the number."
    }),
    branchCode: z.string().refine((branchCode) => {
        if (!branchCode) return true;
        return branchCode.match(/^[0-9]+$/);
    }, {
        message: "Looks like the branch code is invalid, double check the number."
    }),
})

export const sellingAccountSchema = z.object({
    phone: z.string().min(9, "Please enter 9 digit contact number.").max(
        9,
        "Mobile Can't have more than 9 digits."
    ).refine((phone) => phone.match(/^[0-9]+$/), {
        message: "Please enter a valid phone number."
    }),
    phoneOTP: z.string().min(6, "Please enter 6 digit OTP.").max(
        6,
        "OTP Can't have more than 6 digits."
    ).refine((phone) => phone.match(/^[0-9]+$/), {
        message: "Please enter a valid OTP."
    }),
    email: z.string().email({ message: "Please enter a valid email." }),
    emailOTP: z.string().min(6, "Please enter 6 digit OTP.").max(
        6,
        "OTP Can't have more than 6 digits."
    ).refine((phone) => phone.match(/^[0-9]+$/), {
        message: "Please enter a valid OTP."
    }),
    businessAddress: businessAddressSchema,
    personalInfo: personalInfoSchema,
    businessInfo: z.object({
        businessName: z.string().optional(),
        businessRegNo: z.string().optional(),
        businessWebsite: z.string().optional().refine(
            (website) => {
                if (!website) return true;
                // check if a valid url is entered using regex
                const regex = /^(http|https):\/\/[^ "]+$/;
                return regex.test(website);
            },
            {
                message: "Looks like the website is invalid, double check the URL."
            }
        ),
        ownershipType: z.string().optional(),
    }),
    financialInfo: financialInfoSchema

})



export type SellingAccountType = z.infer<typeof sellingAccountSchema>;

// validate single field of selling account
export const validateField = (fieldName: keyof SellingAccountType, value: string): undefined | string => {
    let tempObj = {};

    // if fieldName is a combination of parent and child, split and create the object
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
        sellingAccountSchema.parse(tempObj);
        return undefined;
    } catch (error) {
        if (error instanceof z.ZodError) {
            if (fieldName.includes(".")) {
                const firstError = error.errors.find(e => e.path.includes(fieldName.split(".")[1] as string));
                if (firstError) {
                    return firstError ? firstError.message : "Invalid field value";
                }
            }
            // we only validate one field, return the message for the first error, if exists
            const firstError = error.errors.find(e => e.path.includes(fieldName as string));
            if (firstError) {
                return firstError ? firstError.message : "Invalid field value";
            }

        }
        return undefined;
    }
}