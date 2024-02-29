import React from "react";

// data
import divisionsList from "../data/cities-and-postalcode-by-district.json";
import ListItem from "./ui/ListItem";
import List from "./ui/List";

// utils
import { cn } from "../utils/mergeClasses";

type Division = keyof typeof divisionsList;

interface CitiesListProps extends React.HTMLProps<HTMLUListElement> {}

const makeCitiesListOfDivision = (division: Division) => {
  const cities = divisionsList[division];
  return cities.map((city, index) => {
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

function CitiesList({ ...props }: CitiesListProps) {
  makeCitiesListOfDivision("Ampara");
  return (
    <List
      items={makeCitiesListOfDivision("Ampara")}
      className={cn("py-2", props.className)}
      {...props}
    />
  );
}

export default CitiesList;
