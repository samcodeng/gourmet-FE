import { AppProps } from "next/app";
import { AppProvider } from "../context/AppContext";
import "@/public/css/preset.css";
import "@/public/css/style.css";
import "@/public/css/all.min.css";
import "../styles/global.css";
import NextNProgress from "nextjs-progressbar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <NextNProgress color="#e7d294" />
      <Component {...pageProps} />
    </AppProvider>
  );
}
