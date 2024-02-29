// icons
import { IoClose } from "react-icons/io5";

function Modol({
  headline,
  children,
}: {
  headline: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-500 flex justify-center items-center fixed top-0 left-0 w-full h-full bg-opacity-50">
      <div className="bg-white p-3 rounded-lg max-h-screen-2rem max-w-[97%] overflow-auto">
        {/* model header */}
        <div className="flex justify-between gap-10 items-center">
          <h2 className="text-lg font-medium">{headline}</h2>
          <button className="text-3xl">
            <IoClose />
          </button>
        </div>
        {/* model body */}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modol;
