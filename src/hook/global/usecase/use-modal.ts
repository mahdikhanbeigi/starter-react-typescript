import { useState } from "react";
import { IUseModal, IUseModalState } from "hook/global";

export const useModal = (): IUseModal => {
  const [data, setData] = useState<IUseModalState | undefined>();

  const onOpen: IUseModal["onOpen"] = (newData: IUseModalState) => {
    setData(newData);
  };
  const onClose: IUseModal["onClose"] = () => {
    setData(undefined);
  };
  return {
    data,
    onOpen,
    onClose,
  };
};
