import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "@/../public/images/newLogo.svg";
import TextCarousel from "@/components/TextCarousel";
import Capabilities from "@/components/Capabilities";
import Stepper from "@/components/Stepper";
import Footer from "@/components/Footer";
import TextRevealer from "@/components/animations/TextRevealer";
import TextFadeUpScroll from "@/components/animations/TextFadeUpScroll";
import MenuBar from "@/components/MenuBar";
import ChatBox from "@/components/ChatBox";
import { ArrowUp } from "lucide-react";
import TestimonialStack from "@/components/Testimonial";
import RecentWork from "@/components/RecentWork";
import { useDispatch, useSelector } from "react-redux";
import { showChatBox } from "@/redux/slices/chatSlice";
import ChatBar from "@/components/ChatBar";
import { useInView } from "framer-motion";
import { getServices } from "../../lib/serviceUtils";
import Header from "@/components/Header";
import Head from "next/head";

export default function PhiLandingPage({ services = [] }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef();
  const { showChatDialog: showChatBot } = useSelector(
    (state) => state.chatSlice
  );

  const dispatch = useDispatch();

  const videoRef = useRef(null);

  const ref = useRef(null);
  const isPartiallyInView = useInView(ref, { amount: "some" });

  // Opposite → fully NOT visible
  const isFullyOutOfView = !isPartiallyInView;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; // 0.5 = half speed
    }
  }, []);

  return (
    <div className="bg-[#1D1D20] ">
      <Head>
        <title>The Phi | We Engineer the Extraordinary</title>
        <meta
          name="description"
          content="We turn your boldest visions into reality. We are the architects of your digital future, building innovative solutions that stand tall."
        />
        <meta
          property="og:title"
          content="The Phi | We Engineer the Extraordinary"
        />
        <meta
          property="og:description"
          content="We turn your boldest visions into reality. We are the architects of your digital future, building innovative solutions that stand tall."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div
        ref={ref}
        className="min-h-screen z-1   relative    max-xl:p-4 pb-1      flex flex-col justify-between max-xl:justify-start"
      >
        <Image alt="logo" src={logo} className="w-50 m-6 z-2 max-xl:hidden" />
        <div className="absolute top-4 z-20 w-full xl:hidden">
          <Header />
        </div>

        <div className="absolute top-0 left-0 z-1 w-full h-full bg-black/40" />
        <video
          src={"/videos/pikaso.webm"}
          autoPlay
          loop
          muted
          ref={videoRef}
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-1"
        >
          Your browser does not support the video tag.
        </video>

        <div className=" z-2 mt-2  flex flex-col items-center   justify-center max-xl:justify-around max-xl:min-h-screen text-white     space-y-8   text-3xl ">
          <h1 className="text-center font-[400] text-[64px] max-xl:max-w-66 max-xl:text-[24px] text-white mt-30   ">
            <TextRevealer
              className={"text-center"}
              text={`We don't just dream the extraordinary`}
            />
            <TextRevealer
              className="font-black text-center text-[96px] max-xl:text-[36px] xl:mt-3"
              text={`We engineer it.`}
            />
          </h1>

          <div className="xl:hidden" />
          <div className="space-y-8 ">
            <div className="bg-black rounded-[20px] p-4 shadow z-10 mx-auto min-w-3xl max-xl:min-w-full">
              <p className="font-regular text-[#AAA] text-base px-1 ">
                👋 Hello! We are The Phi, your AI Website Team. What can we do
                for you?
              </p>
            </div>
            <div className="space-y-4">
              <div className="relative min-h-28 bg-white rounded-[20px]">
                <textarea
                  ref={inputRef}
                  className="min-w-3xl max-xl:min-w-full p-4 text-base text-black w-full h-full resize-none rounded-[20px]"
                  placeholder="Ask Anything"
                />
                <div
                  onClick={() => {
                    setQuery(inputRef.current.value ?? "");
                    dispatch(showChatBox(true));
                    setTimeout(() => {
                      window.document
                        .getElementById("botContainer")
                        .scrollIntoView({ behavior: "smooth" });
                    }, 200);
                  }}
                  className="border border-[#EBEBEB] cursor-pointer rounded-xl p-3 absolute top-1/2 right-4 -translate-y-1/2 bg-white"
                >
                  <ArrowUp color="#AAAAAA" />
                </div>
              </div>

              <p className="text-[#AAA]  text-base">{`Reference: Help me design a photographer's portfolio website.`}</p>
            </div>
          </div>
        </div>
        <div className="z-2 m-4 mt-8 flex justify-start max-xl:hidden">
          <MenuBar placement="top" />
        </div>
      </div>

      <div className="flex flex-row w-full">
        {showChatBot && (
          <div
            id="botContainer"
            className={` ${" xl:sticky fixed z-10  max-xl:w-full  top-0  xl:min-w-[35%] opacity-100 h-fit"}`}
          >
            <ChatBox
              message={query}
              onClose={() => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }}
            />
          </div>
        )}

        <div className={showChatBot ? "xl:w-[65%] max-xl:w-full" : "w-full"}>
          <div className="flex w-full flex-col">
            <div className=" z-2 relative bg-[#00000D]   ">
              <div className="radial z-12 absolute animate max-lg:hidden right-0 top-[20%]   h-2/3  xl:w-200 w-60" />
              <div
                className="  
          py-[148px] max-xl:py-20 
          px-16 max-xl:px-[20px]
         leading-[60px] max-xl:leading-[30px]
         space-y-[46px] text-white text-[48px] max-xl:text-[24px] relative"
              >
                <div className="font-regular flex gap-2">
                  <TextFadeUpScroll text={`Hi, We're`} />
                  <TextFadeUpScroll className="font-black" text={`The Phi`} />
                </div>

                <TextFadeUpScroll
                  className="  text-start"
                  text={`We turn your boldest visions into reality. We are \nthe architects of your digital future, building\ninnovative solutions that stand tall.`}
                />

                <TextFadeUpScroll
                  className=""
                  text={`Our secret is finding the perfect harmony where every pixel and every piece of logic is a perfect fit.`}
                />
              </div>
            </div>

            <div className=" bg-[#00000D]   pb-12 border-t   border-t-[#30303D] py-6 border-t-[1px]">
              <TextCarousel />
            </div>

            <div className="z-2 relative overflow-visible   bg-[#00000D]">
              <div className="moveRadial animate -top-20 xl:left-[40%]   left-[14%] h-full min-w-80 max-w-full" />
              <div className="radial animate absolute z-10 xl:-top-3 xl:min-h-full xl:min-w-2/3 max-xl:top-20 max-xl:right-0 max-xl:w-[80%] max-xl:h-[300px] max-w-full" />

              <div className="flex flex-col bg-[#00000D]">
                <Capabilities services={services} />
              </div>
            </div>

            <div className="  z-2 relative overflow-visible      bg-[#00000D] ">
              <div className="moveRadial animate   xl:left-[40%] -top-20 left-[14%] h-full min-w-80 max-w-full" />
              <div className="radial animate absolute z-10   top-200 xl:-top-3 max-xl:-top-0 mt-120 h-1/2 bottom-0  min-w-2/4    max-w-full" />
              <div className="flex flex-col  ">
                <RecentWork isPage />

                <div className="mt-36 border-t border-b border-[#30303D] bg-black relative z-10 py-6 border-[1px">
                  <TextCarousel />
                </div>
              </div>
            </div>

            <div className=" bg-[#00000D] h-full">
              <Stepper />
            </div>

            <div className="  z-2 relative overflow-visible max-xl:overflow-hidden  bg-[#00000D] ">
              <div className="moveRadial animate xl:-top-20 max-xl:-top-40 xl:left-[40%] left-[14%] h-full min-w-80 max-w-full" />
              <div className="radial animate absolute z-10 xl:-top-3 max-xl:-top-0 min-h-full min-w-2/3   max-w-full" />

              <div className="flex flex-col bg-[#00000D] ">
                <TestimonialStack />
              </div>
            </div>

            <div className=" bg-[#00000D] ">
              <Footer />
            </div>
          </div>
        </div>
      </div>

      {!showChatBot && isFullyOutOfView && <ChatBar />}
    </div>
  );
}

export async function getStaticProps() {
  try {
    const services = await getServices();
    return {
      props: {
        services,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching services for home page:", error);
    return {
      props: {
        services: [],
      },
    };
  }
}
