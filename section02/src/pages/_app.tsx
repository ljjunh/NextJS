import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div>글로벌 헤더</div>
      <Component {...pageProps} />
    </>
  );
}
