import { createContext, useContext } from "react";
import { IContext } from "@app/hook/global";

export const ContextGlobal = createContext({} as IContext);
export const useGlobal = () => {
  return useContext(ContextGlobal);
};
