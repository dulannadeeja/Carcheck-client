

import LocationContext from "./locationContext"

import divisionsList from "../../../data/cities-and-postalcode-by-district.json";
import { TCitiesOfDivision, TDivision } from "../location";
import { useState } from "react";
import { TScreenSize, getScreenSize } from "../../../utils/screenSize";

const LocationContextProvider = ({ children }:{
    children: React.ReactNode
}) => {

    // set screen size state when the user resize the window
    window.addEventListener("resize", () => {
        setScreenSize(getScreenSize());
    });

    const [selectedDivision, setSelectedDivision] = useState<TDivision>("all divisions");
    const [screenSize, setScreenSize] = useState<TScreenSize>(getScreenSize());
    const [citiesOfDivision, setCitiesOfDivision] = useState<TCitiesOfDivision>([]);

    return (
        <LocationContext.Provider value={
            {
                divisionsList,
                selectedDivision,
                setSelectedDivision,
                screenSize,
                citiesOfDivision,
                setCitiesOfDivision
            }
        }>
            {children}
        </LocationContext.Provider>
    )
}

export default LocationContextProvider