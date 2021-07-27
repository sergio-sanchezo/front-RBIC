import { createContext, useContext, useState } from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";

const AuthContext = createContext({} as any);

export const AuthContextProvider = (props: any) => {
  const { children } = props;
  const [user, setUser] = useState({} as any);
  const [checking, setChecking] = useState<boolean>();

  const login = async (email: any, password: any) => {
    const resp = await fetchSinToken("auth", { email, password }, "POST");
    const body = await resp.json();

    if (body.ok) {
      const actualDate: string = new Date().getTime() as any;
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", actualDate);
      setUser(body);
      setChecking(false);
    } else {
      setUser(body);
    }
  };

  const startChecking = async () => {
    const resp = await fetchConToken("auth/renew");
    const body = await resp.json();
    if (body.ok) {
      const actualDate: string = new Date().getTime() as any;
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", actualDate);
      setChecking(false);
    }
    setUser(body);
  };

  return (
    <AuthContext.Provider value={{ user, login, checking, startChecking }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
