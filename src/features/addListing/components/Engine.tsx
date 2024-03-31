import { ChangeEvent, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import Input from "../../../components/ui/Input";

const engineOptions = ["Engine A", "Engine B", "Engine C", "Other"];

function Engine() {
  const [selectedEngine, setSelectedEngine] = useState("");
  const [customEngine, setCustomEngine] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (engine: string) => {
    setSelectedEngine(engine);
    if (engine !== "Other") {
      setCustomEngine(""); // Clear custom engine input if not "Other" option
    }
  };

  const handleCustomEngineChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedEngine("Other"); // Set selected engine to "Other"
    setCustomEngine(event.target.value);
  };

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Engine</p>
      <div className="relative col-span-7">
        <div
          className="flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100 cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <p>{selectedEngine || "Select engine"}</p>
          <IoChevronDownOutline className="text-base" />
        </div>
        {showDropdown && (
          <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto mt-1">
            {engineOptions.map((engine) => (
              <p
                key={engine}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => {
                  handleSelect(engine);
                  setShowDropdown(false);
                }}
              >
                {engine}
              </p>
            ))}
          </div>
        )}
        {selectedEngine === "Other" && (
          <Input
            type="text"
            value={customEngine}
            onChange={handleCustomEngineChange}
            className="border border-gray-200 px-2 py-1 rounded-md w-full mt-1 bg-gray-50"
            placeholder="Enter your own"
          />
        )}
      </div>
    </div>
  );
}

export default Engine;
