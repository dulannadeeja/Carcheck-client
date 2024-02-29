import BrandLogo from "../assets/brand/logo.svg";

// icons
import { MdAddShoppingCart } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { AiFillTag } from "react-icons/ai";
import Container from "../components/ui/Container";
import { RiListSettingsFill } from "react-icons/ri";
import { IoMdHeartEmpty } from "react-icons/io";

// components
import ContainerLarge from "../components/ui/ContainerLarge";
import SearchListingsForm from "../components/SearchListingsForm";
// import CategoriesModal from "../components/CategoriesModal";
import LocationModal from "../components/LocationModal";

function Header() {
  return (
    <header className="text-sm py-3 shadow-xl w-full border-2">
      <ContainerLarge>
        <div className="flex justify-between items-center gap-7">
          <div className="shrink-0 min-w-40">
            <img src={BrandLogo} alt="Brand Logo" />
          </div>
          <div className="flex items-center gap-7">
            <nav>
              <ul className="flex gap-7">
                <li>Spare Parts</li>
                <li>Sell on Carcheck</li>
                <li>Services</li>
              </ul>
            </nav>
            <div className="flex items-center gap-7 text-2xl">
              <IoMdHeartEmpty />
              <MdAddShoppingCart />
              <FaRegBell />
              <div className="bg-gray-500 inline-flex p-2 rounded-full">
                <p className="text-white font-bold text-sm">DA</p>
              </div>
            </div>
          </div>
        </div>
        <Container>
          <div className="flex justify-between gap-7 border-t-2 mt-3 pt-5 pb-5">
            <button className="flex items-center justify-center gap-2 shrink-0">
              <span className="text-2xl">
                <IoLocationSharp />
              </span>
              <span>All of Srilanka</span>
            </button>
            <button className="flex items-center justify-center gap-2 shrink-0">
              <span className="text-2xl">
                <AiFillTag />
              </span>
              <span>All Categories</span>
            </button>
            <SearchListingsForm />
            {/* advanced search */}
            <button className="flex items-center justify-center gap-2 shrink-0">
              <span className="text-2xl">
                <RiListSettingsFill />
              </span>
              <span>Advanced Search</span>
            </button>
          </div>
        </Container>
      </ContainerLarge>
      {/* categories modal */}
      {/* <CategoriesModal /> */}
      {/* location modal */}
      <LocationModal />
    </header>
  );
}

export default Header;
