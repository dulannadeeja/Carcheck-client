import { useState } from "react";
import HeaderContext from "./headerContext";

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isWishlistDropdownOpen, setIsWishlistDropdownOpen] = useState(true);

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
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default UserContextProvider;
