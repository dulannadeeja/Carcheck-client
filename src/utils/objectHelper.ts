
// this fuction will get the object and return the modified object with the given value for the given field.
export const updateObjectField = <T>(obj: T, fieldName: keyof T, value: string): T => {
    if (fieldName.toString().includes(".")) {
        const [parent, child] = fieldName.toString().split(".");
        const parentObject = obj[parent as keyof T];
        if (parentObject) {
            parentObject[child as keyof typeof parentObject] = value as never;
        }
        return obj;
    }else{
        obj[fieldName] = value as never;
        return obj;
    }
}