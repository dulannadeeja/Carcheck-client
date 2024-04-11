import { z } from 'zod';
import { AccountType } from '../auth';

export const personalUserSchema = z.object({
    acoountType: z.literal(AccountType.buyerPersonal),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    firstName: z.string().min(1, { message: "Please enter first name" }),
    lastName: z.string().min(1, { message: "Please enter last name" }),
});

export const validateField = (fieldName: keyof PersonalUserFormFields, value: string): undefined | string => {
    const fieldSchema = personalUserSchema.shape[fieldName];
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

export type PersonalFormErrors = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type PersonalUserFormFields = z.infer<typeof personalUserSchema>;