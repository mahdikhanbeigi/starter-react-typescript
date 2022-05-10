import React from "react";
import { AxiosRequestConfig, Canceler } from "axios";

export interface IUseModalState {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export interface IUseModal {
  data?: IUseModalState;
  isStaticBackdrop?: boolean;
  onOpen: (data: IUseModalState) => void;
  onClose: () => void;
}



type IDataController = {
  [index: string]: {
    baseURL?: string;
    url: string;
    method: "POST" | "GET" | "PUT" | "DELETE";
    data?: any;
    config?: AxiosRequestConfig;
  };
};
export type IOutputController = {
  data: [] | {} | null;
  code: boolean;
  errors: string[];
};

export interface IUseController {
  onRequest: (data: IDataController) => {
    output: {
      [index: string]: Promise<IOutputController>;
    };
    cancel: Canceler;
  };
}

export interface IContext {
  modal: IUseModal;
  controller: IUseController;
}
