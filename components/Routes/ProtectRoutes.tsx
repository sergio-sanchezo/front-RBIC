import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useAuth from "../../auth/AuthContext";

// import useAuth from "../../auth/AuthContext";

const ProtectRoutes = (props: any) => {
  const router = useRouter();
  const { children } = props;
  const { startChecking, authenticated } = useAuth();
  useEffect(() => {
    startChecking();
    if (!authenticated) {
      router.push("/login");
    } else {
      router.push("/bien_de_interes");
    }
  }, []);
  return <>{children}</>;
};

export default ProtectRoutes;
