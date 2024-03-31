import Button from "../../../components/ui/Button";
import { IoMdHeartEmpty } from "react-icons/io";

function CurrentSearch() {
  return (
    <>
      <p className="font-medium hidden md:inline-block">
        450,000+ results for bmw
      </p>
      <Button intent="iconText" size="none" className="text-blue-300">
        <IoMdHeartEmpty />
        <span className="text-sm">Save this search</span>
      </Button>
    </>
  );
}

export default CurrentSearch;
