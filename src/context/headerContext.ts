
import { createContext } from "react";

interface IHeaderContext {
    isMobileNavOpen: boolean;
    setIsMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isCartDropdownOpen: boolean;
    setIsCartDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isWishlistDropdownOpen: boolean;
    setIsWishlistDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isNotificationDropdownOpen: boolean;
    setIsNotificationDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isProfileDropdownOpen: boolean;
    setIsProfileDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isLocationModalOpen: boolean;
    setIsLocationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isCategoryModalOpen: boolean;
    setIsCategoryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderContext = createContext<undefined | IHeaderContext>(undefined);

export default HeaderContext;