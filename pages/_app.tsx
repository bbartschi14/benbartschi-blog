import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { IBM_Plex_Sans } from "next/font/google";
const font = IBM_Plex_Sans({
  weight: ["500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
