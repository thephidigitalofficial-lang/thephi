import "@/styles/globals.css";
import "@/styles/button.css";

import useSmoothScroll from "@/hooks/useSmoothScroll";
import "aos/dist/aos.css";
import AOS from "aos";
import { Provider, useSelector } from "react-redux";
import { useEffect } from "react";
import SignInDialog from "@/components/dialog/SignInDialog";
import store from "@/redux/store";
import ChatBox from "@/components/ChatBox";
import ChatBar from "@/components/ChatBar";
import { useRouter } from "next/router";
import Head from "next/head";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  useSmoothScroll();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <>
      <Head>
        <title>The Phi | Engineering Extraordinary</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon2.ico" />
        <meta
          name="description"
          content="We turn your boldest visions into reality. We are the architects of your digital future."
        />
      </Head>
      <Provider store={store}>
        <AppComponent Component={Component} pageProps={pageProps} />
      </Provider>
      <Toaster richColors position="bottom-right" />
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap");
        * {
          font-family: "Lato", sans-serif;
          font-weight: 400;
        }
      `}</style>
    </>
  );
}

const AppComponent = ({ Component, pageProps }) => {
  const excludedPaths = ["/"];
  const currentLocation = useRouter().asPath;
  const { query, showChatDialog } = useSelector((state) => state.chatSlice);
  const showChatBot =
    showChatDialog &&
    excludedPaths.find((location) => location != currentLocation);

  const showChatBar =
    !showChatBot &&
    excludedPaths.find((location) => location != currentLocation);

  return (
    <div className="bg-[#1D1D20]">
      <SignInDialog />
      <div className="flex">
        {showChatBot && (
          <div
            id="botContainer"
            className={` ${" xl:sticky fixed z-100  max-xl:w-full  top-0  xl:min-w-[35%] opacity-100 h-fit"}`}
          >
            <ChatBox message={query} onClose={() => { }} />
          </div>
        )}
        <div
          className={`bg-[#00000D] ${showChatBot ? "xl:w-[65%] max-xl:w-full" : "w-full"
            }`}
        >
          <Component {...pageProps} />
        </div>
      </div>
      {showChatBar && <ChatBar />}
    </div>
  );
};
