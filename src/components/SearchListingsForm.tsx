import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setFilterOptions } from "../features/listing/clientListingSlice";
import { RootState } from "../store/store";


function SearchListingsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const { filterOptions } = useSelector((state: RootState) => state.clientListing);

  useEffect(()=>{
    setSearch(filterOptions.search || "");
  }, [filterOptions.search])
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();  // Prevent the default form submit
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (location.pathname !== "/listings") {
      navigate("/listings");
    }
    dispatch(setFilterOptions({ search }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form className="w-full flex border-[0.05rem] rounded-full border-gray-500 overflow-hidden" 
      onSubmit={onSubmit}
    >
      <label htmlFor="search" hidden>
        Search
      </label>
      <input
        type="text"
        placeholder="Search for cars"
        className="flex-1 px-4"
        value={search}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button type="submit" className="px-4 py-3 overflow-hidden text-2xl"
      >
        <IoMdSearch />
      </button>
    </form>
  );
}

export default SearchListingsForm;
