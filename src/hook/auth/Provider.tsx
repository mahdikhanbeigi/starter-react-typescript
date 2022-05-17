import { IAuthUser, IContext, ContextAuth } from "@app/hook/auth";
import React, { useState } from "react";

const INIT_USER = localStorage.getItem("user")
  ? (JSON.parse(localStorage.getItem("user") || "") as IAuthUser)
  : undefined;

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState<IAuthUser | undefined>(INIT_USER);

  const onLogin: IContext["onLogin"] = (username, passowrd) => {
    const user = {
      username,
    };
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };

  const onLogout: IContext["onLogout"] = () => {
    localStorage.removeItem("user");
    setUser(undefined);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      });
    });
  };
  return (
    <ContextAuth.Provider
      value={{
        user,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </ContextAuth.Provider>
  );
};
