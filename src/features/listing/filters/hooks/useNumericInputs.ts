import { useCallback, useEffect, useState } from "react";

function useNumericInputs(initialValue: string) {
  const [inputDisplayValue, setInputDisplayValue] = useState<string>("");
  const [numericValue, setNumericValue] = useState<number>(0);

  const formatFunction = useCallback((value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
  },[])

  useEffect(()=>{
    const isNan = isNaN(parseInt(initialValue));
    setNumericValue(isNan ? 0 : parseInt(initialValue));
    setInputDisplayValue(isNan ? "" : formatFunction(parseInt(initialValue)));
  },[formatFunction, initialValue])

  const handleSetValue = (input: string) => {
    // Remove all non-numeric characters except the decimal point and empty string
    const cleanInput = input.replace(/[^\d.]+/g, '')
    const parsedValue = parseInt(cleanInput);

    if (!isNaN(parsedValue)) {
      setNumericValue(parsedValue);
      setInputDisplayValue(formatFunction ? formatFunction(parsedValue) : cleanInput);
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

export default useNumericInputs;