import { useContext, createContext } from "react";
import { IContext } from "./types";

export const ContextAuth = createContext({} as IContext);
export const useGlobalAuth = () => {
  return useContext(ContextAuth);
};
