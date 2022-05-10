import { createContext, useContext } from "react";
import { IContext } from "hook/global";

export const ContextGlobal = createContext({} as IContext);
export const useGlobal = () => {
    return useContext(ContextGlobal);
};