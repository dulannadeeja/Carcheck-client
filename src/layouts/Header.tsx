import BrandLogo from "../assets/brand/logo.svg";
import { MdAddShoppingCart } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { AiFillTag } from "react-icons/ai";
import Container from "../components/ui/Container";
import { RiListSettingsFill } from "react-icons/ri";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import ContainerLarge from "../components/ui/ContainerLarge";
import SearchListingsForm from "../components/SearchListingsForm";
import CategoriesModal from "../features/categoryFilter/components/CategoriesModal";
import LocationModal from "../features/locationFilter/components/LocationModal";
import Button from "../components/ui/Button";
import MobileNavModal from "../components/MobileNavModal";
import CartDropdown from "../features/Cart/components/CartDropdown";
import WishlistDropdown from "../features/Wishlist/components/WishlistDropdown";
import NotificationDropdown from "../features/notification/components/NotificationDropdown";
import ProfileDropdown from "../components/ProfileDropdown";
import useHeaderContext from "../features/authentication/hooks/useHeaderContext";
import { cn } from "../utils/mergeClasses";
import LocationContextProvider from "../features/locationFilter/context/locationContextProvider";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { SERVER_URL } from "../utils/constants";
import userProfilePlaceholder from "../assets/placeholders/user-profile-placeholder-1.png";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import NotificationArea from "../features/notification/components/NotificationArea";
import NotificationIcon from "../features/notification/components/NotificationIcon";

function Header() {
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // refresh the header component when user changes
    console.log("User changed");
    console.log(user);
  }, [user]);
  const {filterOptions  } = useSelector((state: RootState) => state.clientListing);
  const {city, division} = filterOptions;

  const {
    setIsMobileNavOpen,
    setIsCartDropdownOpen,
    isCartDropdownOpen,
    isWishlistDropdownOpen,
    setIsWishlistDropdownOpen,
    isNotificationDropdownOpen,
    setIsNotificationDropdownOpen,
    isProfileDropdownOpen,
    setIsProfileDropdownOpen,
    isLocationModalOpen,
    setIsLocationModalOpen,
    isCategoryModalOpen,
    setIsCategoryModalOpen,
  } = useHeaderContext();

  return (
    <header className="text-sm py-2 w-full">
      <ContainerLarge>
        {/* top bar start */}
        <div className="flex justify-between items-center gap-7 z-50">
          <div className="md:hidden">
            <Button
              intent={"iconRound"}
              size={"mediumRound"}
              onClick={() => setIsMobileNavOpen(true)}
            >
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
                <li><Link to={'/selling/start-selling'}>Sell on Carcheck</Link></li>
                <li>Services</li>
              </ul>
            </nav>
            <div className="flex items-center gap-7 text-2xl">
              {/* wishlist */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setIsWishlistDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  setIsWishlistDropdownOpen(false);
                }}
              >
                <Button intent={"iconRound"} size={"mediumRound"}>
                  <IoMdHeartEmpty />
                </Button>
                <WishlistDropdown
                  className={cn({
                    hidden: !isWishlistDropdownOpen,
                  })}
                />
              </div>
              {/* cart */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setIsCartDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  setIsCartDropdownOpen(false);
                }}
              >
                <Button intent={"iconRound"} size={"mediumRound"} className="">
                  <MdAddShoppingCart />
                </Button>
                <CartDropdown
                  className={cn({
                    hidden: !isCartDropdownOpen,
                  })}
                />
              </div>

              {/* notification */}

              <div
                className="relative"
                onMouseEnter={() => {
                  setIsNotificationDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  setIsNotificationDropdownOpen(false);
                }}
              >
                <NotificationIcon/>
                <NotificationDropdown
                  className={cn({
                    hidden: !isNotificationDropdownOpen,
                  })}
                />
              </div>

              {/* profile */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setIsProfileDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  setIsProfileDropdownOpen(false);
                }}
              >
                <div className="flex justify-center items-center bg-gray-500 w-10 h-10 md:inline-flex rounded-full">
                  {user &&
                    (user.avatar ? (
                      <img
                        src={`${SERVER_URL}/images/${user.avatar}`}
                        alt="user-profile"
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    ) : (
                      <div className="p-3 text-sm font-medium text-white">
                        {user.firstName.charAt(0).toUpperCase() +
                          user.lastName.charAt(0).toUpperCase()}
                      </div>
                    ))}
                  {!user && (
                    <img
                      src={userProfilePlaceholder}
                      alt="user-profile"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  )}
                </div>
                <ProfileDropdown
                  className={cn({
                    hidden: !isProfileDropdownOpen,
                  })}
                />
              </div>
            </div>
          </div>
        </div>
        {/* top bar end */}
      </ContainerLarge>
      {/* <hr className="my-2" /> */}
      {/* search bar start */}
      <Container>
        <div className="grid grid-cols-12 py-3 gap-5 md:flex md:justify-between">
          <Button
            onClick={() => setIsLocationModalOpen(true)}
            intent={"iconText"}
            size={"none"}
            className="shrink-0 order-3 col-span-5 hover:text-blue-300 md:order-1"
          >
            <span className="text-2xl">
              <IoLocationSharp />
            </span>
            <span>{city ? city : division ? division : "All of srilanka"}</span>
          </Button>
          <Button
            onClick={() => setIsCategoryModalOpen(true)}
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
            <span className="hidden lg:flex lg:shrink-0">Advanced Search</span>
          </Button>
        </div>
        <NotificationArea />
      </Container>
      {/* search bar end */}

      {/* Mobile navigation menu */}
      <MobileNavModal />

      {/* categories modal */}
      <>
        {isCategoryModalOpen && (
          <CategoriesModal onClose={() => setIsCategoryModalOpen(false)} />
        )}
      </>
      {/* location modal */}
      <>
        {isLocationModalOpen && (
          <LocationContextProvider>
            <LocationModal
              onClose={() => {
                setIsLocationModalOpen(false);
              }}
            />
          </LocationContextProvider>
        )}
      </>
    </header>
  );
}

export default Header;
