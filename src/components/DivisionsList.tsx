import divisionsList from "../data/cities-and-postalcode-by-district.json";
import ListItem from "./ui/ListItem";
import List from "./ui/List";

// icons
import { MdNavigateNext } from "react-icons/md";

const makeDivisionItemsArray = () => {
  const divisions = Object.keys(divisionsList);
  return divisions.map((division, index) => {
    return (
      <ListItem
        key={index}
        className="flex justify-between gap-20 items-center  border-gray-200 py-2 px-2 hover:bg-gray-100 hover:text-blue-300 transition-colors duration-200 ease-in-out cursor-pointer rounded-sm"
      >
        <span>{division}</span>
        <span className="text-lg">
          <MdNavigateNext />
        </span>
      </ListItem>
    );
  });
};

function DivisionsList() {
  return <List items={makeDivisionItemsArray()} className="py-2" />;
}

export default DivisionsList;
