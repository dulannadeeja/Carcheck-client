import { useEffect, useState } from "react";


function useYearInput(initialValue: string) {
    const [inputDisplayValue, setInputDisplayValue] = useState<string>("");
    const [numericValue, setNumericValue] = useState<number>(0);
    
    useEffect(()=>{
        const isNan = isNaN(parseInt(initialValue));
        setNumericValue(isNan ? 0 : parseInt(initialValue));
        setInputDisplayValue(isNan ? "" : initialValue );
    },[initialValue])
    
    const handleSetValue = (input: string) => {
        // Remove all non-numeric characters except the empty string
        // limit the input to 4 characters
        const cleanInput = input.replace(/[^\d]+/g, '').slice(0, 4);
        const parsedValue = parseInt(cleanInput);
    
        if (!isNaN(parsedValue)) {
        setNumericValue(parsedValue);
        setInputDisplayValue(parsedValue.toString());
        } else {
        setInputDisplayValue(cleanInput);
        setNumericValue(0);
        }
    };
    
    return {
        formattedValue: inputDisplayValue,
        numericValue,
        setNumericValue: handleSetValue,
    }
}

export default useYearInput;