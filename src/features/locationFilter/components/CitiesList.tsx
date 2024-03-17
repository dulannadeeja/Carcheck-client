import React from "react";

import ListItem from "../../../components/ui/ListItem";
import List from "../../../components/ui/List";

// utils
import { cn } from "../../../utils/mergeClasses";
import { TCitiesOfDivision } from "../location";
import useLocationContext from "../hooks/useLocationContext";

const makeCitiesListOfDivision = (citiesOfDivision: TCitiesOfDivision) => {
  return citiesOfDivision.map((city, index) => {
    return (
      <ListItem
        key={index}
        className="flex justify-between gap-5 items-center  border-gray-200 py-2 px-2 hover:bg-gray-100 hover:text-blue-300 transition-colors duration-200 ease-in-out cursor-pointer rounded-sm"
      >
        <span>{city.city}</span>
      </ListItem>
    );
  });
};

type CitiesListProps = React.HTMLAttributes<HTMLUListElement>;

function CitiesList({ className }: CitiesListProps) {
  const { citiesOfDivision } = useLocationContext();

  return citiesOfDivision.length !== 0 ? (
    <List
      items={makeCitiesListOfDivision(citiesOfDivision)}
      className={cn("py-2", className)}
    />
  ) : (
    <div className="py-2">
      <p className="text-gray-300">
        Select a division to view cities of that division...
      </p>
    </div>
  );
}

export default CitiesList;
