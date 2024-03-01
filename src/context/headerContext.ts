import React from "react";
import { createContext } from "react";

interface IHeaderContext {
    isMobileNavOpen: boolean;
    setIsMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderContext = createContext<undefined | IHeaderContext>(undefined);

export default HeaderContext;