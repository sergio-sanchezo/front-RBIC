import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useAuth from "../../auth/AuthContext";

// import useAuth from "../../auth/AuthContext";

const ProtectRoutes = (props: any) => {
  const router = useRouter();
  const { children } = props;
  const { startChecking, authenticated, loading } = useAuth();
  useEffect(() => {
    startChecking();
    if (!authenticated) {
      router.push("/login");
    }
  }, []);
  return loading && router.pathname !== "/login" ? <></> : <>{children}</>;
};

export default ProtectRoutes;
