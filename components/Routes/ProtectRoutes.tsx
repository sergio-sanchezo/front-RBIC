import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useAuth from "../../auth/AuthContext";

const ProtectRoutes = (props: any) => {
  const { checking, user } = useAuth();
  const router = useRouter();
  const { children } = props;
  console.log(checking);
  useEffect(() => {
    console.log(checking);
    if (checking) {
      router.push("/login");
    } else {
      if (user.role === "visitant") {
        router.push("visitantView");
      }
      if (user.role === "admin") {
        router.push("punto_de_referencia");
      }
    }
  }, [checking]);
  return <>{children}</>;
};

export default ProtectRoutes;
