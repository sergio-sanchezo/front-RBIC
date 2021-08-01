import React, { createContext, useContext, useState } from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { useRouter } from "next/router";
import { message } from "antd";

const AuthContext = createContext({} as any);

export const AuthContextProvider = (props: any) => {
  const router = useRouter();
  const { children } = props;
  const [session, setSession] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const startLogin = async (email: any, password: any) => {
    const resp = await fetchSinToken("auth", { email, password }, "POST");
    const body = await resp.json();
    if (body.ok) {
      if (body.role === "visitante") {
        message.warning("No tienes permisos para acceder");
        setAuthenticated(false);
      } else {
        const actualDate: string = new Date().getTime() as any;
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", actualDate);
        setSession(body);
        setAuthenticated(true);
        setLoading(false);
        router.push("/bien_de_interes");
      }
    } else {
      message.error("Contraseña o correo incorrectos");
    }
  };

  const startChecking = async () => {
    const resp = await fetchConToken("auth/renew");
    const body = await resp.json();
    if (body.ok) {
      if (body.data.usr_role === "visitante" || body.role == "visitante") {
        console.log(body);
        setAuthenticated(false);
        router.push("/login");
      }
      const actualDate: string = new Date().getTime() as any;
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", actualDate);
      setSession(body);
      setAuthenticated(true);
      setLoading(false);
      router.push("/bien_de_interes");
    }
  };

  const logout = async () => {
    localStorage.clear();
    router.push("/login");
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
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
