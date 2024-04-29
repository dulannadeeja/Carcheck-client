import { z, ZodIssue, ZodType } from "zod";

// Define a generic type for the schema
type Schema = ZodType;

// this function will validate a single field of a schema and return the error message if any, otherwise undefined
export const validateSchemaField = <T>(schema: Schema, fieldName: keyof T, value: string): undefined | string => {
    const tempObj: Partial<T> = {};

    // if fieldName is a combination of parent and child, split and create the object
    if (fieldName.toString().includes(".")) {
        const [parent, child] = (fieldName as string).split(".");
        tempObj[parent as keyof T] = { [child]: value } as T[keyof T];
    } else {
        tempObj[fieldName] = value as T[keyof T];
    }

    try {
        schema.parse(tempObj as T);
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


// this fuction will validate the entire schema and return the error object if any, otherwise false
export const getErrors = async <T, TError>(schema: ZodType, data: T): Promise<{
    data: T,
    errors: TError,
    isValid: boolean
}> => {
    const result = schema.safeParse(data) as { 
        success: boolean; 
        error: { issues: ZodIssue[] },
        data: T
     };
    const newErrors = {} as TError;
    if (!result.success) {
        result.error.issues.forEach((issue) => {
            if (issue.path.length > 1) {
                const parentKey = issue.path[0] as keyof TError;
                const parent = newErrors[parentKey];
                const updatedParent = {
                    ...(parent as object),
                    [issue.path[1]]: issue.message,
                };

                newErrors[parentKey] = updatedParent as never;
            } else {
                const key = issue.path[0] as keyof TError;
                newErrors[key] = issue.message as never;
            }
        });
        return {
            data: result.data,
            isValid: false,
            errors: newErrors,
        };
    }
    return {
        data: result.data,
        isValid: true,
        errors: newErrors,
    }
};

