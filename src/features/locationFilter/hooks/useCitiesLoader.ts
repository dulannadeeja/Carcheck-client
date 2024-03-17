import { useEffect } from "react"
import useLocationContext from "./useLocationContext";
import { getCitiesOfDivision } from "../location";

export const useCitiesLoader = () => {

    const { divisionsList, selectedDivision, setCitiesOfDivision } = useLocationContext();

    useEffect(() => {
        setCitiesOfDivision(getCitiesOfDivision(selectedDivision));
    }
    , [divisionsList, selectedDivision,setCitiesOfDivision]);
}