import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../auth/AuthContext";
import ProtectRoutes from "../components/Routes/ProtectRoutes";
import "../styles/styles.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ProtectRoutes>
        <Component {...pageProps} />
      </ProtectRoutes>
    </AuthContextProvider>
  );
}

export default MyApp;
