import ListItem from "../../../components/ui/ListItem";
import List from "../../../components/ui/List";

// icons
import { MdNavigateNext } from "react-icons/md";
import useLocationContext from "../hooks/useLocationContext";
import { TDivision } from "../location";

type TDivisionsListProps = React.HTMLAttributes<HTMLUListElement>;

function DivisionsList({ className }: TDivisionsListProps) {
  const { divisionsList, setSelectedDivision } = useLocationContext();

  const makeDivisionItemsArray = () => {
    const divisions = Object.keys(divisionsList);
    return divisions.map((division, index) => {
      return (
        <ListItem
          onClick={() => {
            setSelectedDivision(division as TDivision);
          }}
          key={index}
          className="flex justify-between gap-3 md:gap-10 items-center  border-gray-200 py-2 px-2 hover:bg-gray-100 hover:text-blue-300 transition-colors duration-200 ease-in-out cursor-pointer rounded-sm"
        >
          <span>{division}</span>
          <span className="text-lg">
            <MdNavigateNext />
          </span>
        </ListItem>
      );
    });
  };

  return <List items={makeDivisionItemsArray()} className={className} />;
}

export default DivisionsList;
