import { useState } from "react";
import HeaderContext from "./headerContext";

const HeaderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isWishlistDropdownOpen, setIsWishlistDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(true);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // set mobile nav open state to false
  // when the user resize the window to a bigger size (desktop)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      setIsMobileNavOpen(false);
    }
  });

  return (
    <HeaderContext.Provider
      value={{
        isMobileNavOpen,
        setIsMobileNavOpen,
        isCartDropdownOpen,
        setIsCartDropdownOpen,
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
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderContextProvider;
