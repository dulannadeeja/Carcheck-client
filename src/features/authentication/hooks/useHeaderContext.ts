import { useContext } from "react";
import HeaderContext from "../../../context/headerContext";


const useHeaderContext = () =>{
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error("useHeaderContext must be used within a HeaderContextProvider");
    }
    return context;
}

export default useHeaderContext;