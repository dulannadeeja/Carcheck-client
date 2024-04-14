import {z} from 'zod';

export const inspectionRequestSchema = z.object({
  listing: z.string(),
  serviceProvider: z.string().min(1,"Please choose a service provider fits your needs."),
  serviceBranch: z.string().min(1,"Please enter choose a service branch."),
  inspectionDate: z.date({
    invalid_type_error: "Please select a date for inspection.",
    required_error: "Please select a date for inspection.",
  }).refine((date) => date > new Date(), {
    message: "Please select a date in the future",
  }),
  inspectionTime: z.date({
    required_error: "Please select a time for inspection.",
    invalid_type_error: "Please select a time for inspection.",
  }).refine((date) => date > new Date(), {
    message: "Please select a time in the future",
    
  }),
  contactNumber: z.string().min(9,"Please enter 9 digit contact number.").max(
    9,
    "Mobile Can't have more than 9 digits."
  ),
});

export type InspectionRequestType = z.infer<typeof inspectionRequestSchema>;

// validate single field of inspection request
export const validateField = (fieldName: keyof InspectionRequestType, value: string): undefined | string => {
    const fieldSchema = inspectionRequestSchema.shape[fieldName];
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