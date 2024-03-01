

// assets
import BrandLogo from "../assets/brand/logo.svg";
import { MdAddShoppingCart } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { AiFillTag } from "react-icons/ai";
import Container from "../components/ui/Container";
import { RiListSettingsFill } from "react-icons/ri";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";

// components
import ContainerLarge from "../components/ui/ContainerLarge";
import SearchListingsForm from "../components/SearchListingsForm";
// import CategoriesModal from "../components/CategoriesModal";
// import LocationModal from "../components/LocationModal";
import Button from "../components/ui/Button";
import MobileNavModal from "../components/MobileNavModal";

// context
import useHeaderContext from "../features/authentication/hooks/useHeaderContext";

function Header() {
  const { setIsMobileNavOpen } = useHeaderContext();

  return (
    <header className="text-sm py-2 w-full shadow-lg">
      <ContainerLarge>
        {/* top bar start */}
        <div className="flex justify-between items-center gap-7 border-b-[0.05rem]">
          <div className="md:hidden">
            <Button intent={"iconRound"} size={"mediumRound"} onClick={
              () => setIsMobileNavOpen(true)
            }>
              <IoMenuOutline className="" />
            </Button>
          </div>
          <div className="shrink-0 min-w-40">
            <img src={BrandLogo} alt="Brand Logo" />
          </div>
          <div className="flex items-center gap-7">
            <nav className="hidden md:block">
              <ul className="flex gap-7">
                <li>Spare Parts</li>
                <li>Sell on Carcheck</li>
                <li>Services</li>
              </ul>
            </nav>
            <div className="flex items-center gap-7 text-2xl">
              <Button intent={"iconRound"} size={"mediumRound"}>
                <IoMdHeartEmpty />
              </Button>
              <Button
                intent={"iconRound"}
                size={"mediumRound"}
                className="hidden md:inline-flex"
              >
                <MdAddShoppingCart />
              </Button>
              <Button intent={"iconRound"} size={"mediumRound"}>
                <FaRegBell />
              </Button>
              <div className="bg-gray-500 md:inline-flex p-2 rounded-full hidden">
                <p className="text-white font-bold text-sm">DA</p>
              </div>
            </div>
          </div>
        </div>
        {/* top bar end */}

        {/* search bar start */}
        <Container>
          <div className="grid grid-cols-12 py-3 gap-5 md:flex md:justify-between">
            <Button
              intent={"iconText"}
              size={"none"}
              className="shrink-0 order-3 col-span-5 hover:text-blue-300 md:order-1"
            >
              <span className="text-2xl">
                <IoLocationSharp />
              </span>
              <span>All of Srilanka</span>
            </Button>
            <Button
              intent={"iconText"}
              size={"none"}
              className=" order-2 col-span-5 hover:text-blue-300 md:order-2"
            >
              <span className="text-2xl">
                <AiFillTag />
              </span>
              <span>All Categories</span>
            </Button>
            {/* Search input */}
            <div className="col-span-12 order-1 md:order-3 md:flex-1">
              <SearchListingsForm />
            </div>
            {/* advanced search */}
            <Button
              intent={"iconText"}
              size={"none"}
              className="order-4 col-span-2 hover:text-blue-300 justify-end md:order-4"
            >
              <span className="text-2xl">
                <RiListSettingsFill />
              </span>
              <span className="hidden lg:flex lg:shrink-0">
                Advanced Search
              </span>
            </Button>
          </div>
        </Container>
        {/* search bar end */}
      </ContainerLarge>

      {/* Mobile navigation menu */}
      <MobileNavModal />

      {/* categories modal */}
      {/* <CategoriesModal /> */}
      {/* location modal */}
      {/* <LocationModal /> */}
    </header>
  );
}

export default Header;
