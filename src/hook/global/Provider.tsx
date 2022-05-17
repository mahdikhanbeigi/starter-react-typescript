import React from "react";
import { ContextGlobal, useModal, useController } from "@app/hook/global";
import { IDictionary } from "@starter-frontend/theme";

export const GlobalProvider = ({
  children,
  dictionary,
}: React.PropsWithChildren<{ dictionary: IDictionary }>) => {
  const modal = useModal();
  const controller = useController(dictionary);

  return (
    <ContextGlobal.Provider
      value={{
        modal,
        controller,
      }}
    >
      {children}
    </ContextGlobal.Provider>
  );
};
