// import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useAuth from "../../auth/AuthContext";

const ProtectRoutes = (props: any) => {
  const { startChecking, user, setUser } = useAuth();
  const { children } = props;

  useEffect(() => {
    startChecking();
  }, []);
  return <>{children}</>;
};

export default ProtectRoutes;
