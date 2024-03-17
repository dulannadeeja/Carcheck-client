
import { createContext } from "react";

import { TDivisionList,TDivision,TCitiesOfDivision } from "../location";
import { TScreenSize } from "../../../utils/screenSize";

interface ILocationContext {
    divisionsList: TDivisionList;
    selectedDivision: TDivision;
    setSelectedDivision: React.Dispatch<React.SetStateAction<TDivision>>;
    screenSize: TScreenSize;
    citiesOfDivision: TCitiesOfDivision;
    setCitiesOfDivision: React.Dispatch<React.SetStateAction<TCitiesOfDivision>>;
}

const LocationContext = createContext<undefined | ILocationContext>(undefined);

export default LocationContext;