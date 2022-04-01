
import { Context } from "./index";
import { IAuthUser,IContext } from "./types";
import { useState } from "react";

const INIT_USER = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')||"") as IAuthUser : undefined;

const AuthProvider : React.FC = ({ children }) => {
    const [user,setUser] = useState<IAuthUser|undefined>(INIT_USER);
   
    const onLogin : IContext['onLogin'] = (username,passowrd)=>{
        const user = {
            username
        }
        localStorage.setItem("user",JSON.stringify(user))
        setUser(user)
        return new Promise(resolve=>{
            setTimeout(()=>{
                resolve(true)
            },1000)
        })
    }

    const onLogout : IContext['onLogout'] = ()=>{
        localStorage.removeItem("user");
        setUser(undefined)
        return new Promise(resolve=>{
            setTimeout(()=>{
                resolve(true)
            })
        })
    }

    return (
        <Context.Provider value={{
            user,
            onLogin,
            onLogout
        }}>
            {children}
        </Context.Provider>
    )
}
export default AuthProvider;