import { z } from 'zod';
import { AccountType } from '../auth';

export const businessUserSchema = z.object({
    acoountType: z.literal(AccountType.buyerBusiness),
    email: z.string().email({ message: "Please enter a valid email." }),
    businessName: z.string().min(1, { message: "Please enter your business name" })
        .min(3, { message: "Business name must be at least 3 characters long" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    firstName: z.string().min(1, { message: "Please enter first name" }),
    lastName: z.string().min(1, { message: "Please enter last name" }),
});

export const validateField = (fieldName: keyof BusinessUserFormFields, value: string): undefined | string => {
    const fieldSchema = businessUserSchema.shape[fieldName];
    if (!fieldSchema) {
        console.error("No such field in schema:", fieldName);
        return "No such field in schema";
    }
    try {
        // Validate the value against the field schema
        fieldSchema.parse(value);
        return undefined;
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle or log the validation error
            return error.errors[0].message;
        }
    }
}

export type BusinessUserFormErrors = {
    firstName: string;
    lastName: string;
    businessName: string;
    email: string;
    password: string;
}

export type BusinessUserFormFields = z.infer<typeof businessUserSchema>;