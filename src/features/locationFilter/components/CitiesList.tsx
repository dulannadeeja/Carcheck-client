import React from "react";

import ListItem from "../../../components/ui/ListItem";
import List from "../../../components/ui/List";

// utils
import { cn } from "../../../utils/mergeClasses";
import { TCitiesOfDivision } from "../location";
import useLocationContext from "../hooks/useLocationContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setFilterOptions } from "../../listing/clientListingSlice";

type CitiesListProps = React.HTMLAttributes<HTMLUListElement> & {
  onClose: () => void;
};

function CitiesList({ className, onClose }: CitiesListProps) {
  const dispatch = useDispatch();
  const { citiesOfDivision, selectedDivision } = useLocationContext();
  const { filterOptions } = useSelector((state: RootState) => state.clientListing);

  const makeCitiesListOfDivision = (
    citiesOfDivision: TCitiesOfDivision,
    selectedDivision: string
  ) => {
    const modifiedCitiesOfDivision: string[] = [
      `All of ${selectedDivision} division`,
    ];

    citiesOfDivision.forEach((city) => {
      modifiedCitiesOfDivision.push(city.city);
    });

    return modifiedCitiesOfDivision.map((city, index) => {
      return (
        <ListItem
          key={index}
          className={cn(
            "flex justify-between gap-5 items-center  border-gray-200 py-2 px-2 hover:bg-gray-100 hover:text-blue-300 transition-colors duration-200 ease-in-out cursor-pointer rounded-sm",
            {
              "font-medium":
                city === `All of ${selectedDivision} division`,
              "font-medium text-blue-300": filterOptions.city === city,
            }
          )}
          onClick={() => {
            dispatch(setFilterOptions({ city }));
            if(city === `All of ${selectedDivision} division`) {
              dispatch(setFilterOptions({ division: selectedDivision }))
            }
            onClose();
          }}
        >
          <span>{city}</span>
        </ListItem>
      );
    });
  };

  return citiesOfDivision.length !== 0 ? (
    <List
      items={makeCitiesListOfDivision(citiesOfDivision, selectedDivision)}
      className={cn("py-2", className)}
    />
  ) : (
    <div className="py-2 text-nowrap">
      <p className="text-gray-300">
        Select a division to view cities of that division...
      </p>
    </div>
  );
}

export default CitiesList;
