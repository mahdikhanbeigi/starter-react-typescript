import { createContext, useContext } from "react";
import { IContext } from "./types";

export const Context = createContext({} as IContext);
export const useAuth = () => {
    return useContext(Context);
};