import { Context } from "./index";
import useModal from "./use-modal";
import useController from "./use-controller";
import { IDictionary } from "typings/theme";
import React from "react";

const CustomThemeProvider = ({
  children,
  dictionary,
}: React.PropsWithChildren<{ dictionary: IDictionary }>) => {
  const modal = useModal();
  const controller = useController(dictionary);

  return (
    <Context.Provider
      value={{
        modal,
        controller,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default CustomThemeProvider;
