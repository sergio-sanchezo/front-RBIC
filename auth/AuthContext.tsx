import React, { createContext, useContext, useState } from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { useRouter } from "next/router";

const AuthContext = createContext({} as any);

export const AuthContextProvider = (props: any) => {
  const router = useRouter();
  const { children } = props;
  const [session, setSession] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  const startLogin = async (email: any, password: any) => {
    const resp = await fetchSinToken("auth", { email, password }, "POST");
    const body = await resp.json();
    if (body.ok) {
      const actualDate: string = new Date().getTime() as any;
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", actualDate);
      setSession(body);
      setAuthenticated(true);
      router.push("/bien_de_interes");
    }
  };

  const startChecking = async () => {
    const resp = await fetchConToken("auth/renew");
    const body = await resp.json();
    if (body.ok) {
      const actualDate: string = new Date().getTime() as any;
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", actualDate);
      setSession(body);
      setAuthenticated(true);
      router.push("/bien_de_interes");
    }
  };

  const logout = async () => {
    localStorage.clear();
    router.push("login");
  };
  return (
    <AuthContext.Provider
      value={{
        session,
        authenticated,
        setAuthenticated,
        startLogin,
        startChecking,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
