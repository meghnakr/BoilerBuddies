import { useContext } from "react";
import { UserContext } from "../context/userContext";


const useUser = () => {
    return useContext(UserContext);     // turns Context into a hook
} 

export default useUser;

