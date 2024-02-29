import { IoMdSearch } from "react-icons/io";

function SearchListingsForm() {
  return (
    <form className="w-full flex border-[0.05rem] rounded-full border-gray-500 overflow-hidden">
      <label htmlFor="search" hidden>
        Search
      </label>
      <input
        type="text"
        placeholder="Search for cars"
        className="flex-1 px-4"
      />
      <button type="submit" className="px-4 py-3 overflow-hidden text-2xl">
        <IoMdSearch />
      </button>
    </form>
  );
}

export default SearchListingsForm;
