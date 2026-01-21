import TextFadeUpScroll from "@/components/animations/TextFadeUpScroll";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TextCarousel from "@/components/TextCarousel";
import Image from "next/image";
import React from "react";
import { ReactFitty } from "react-fitty";
import { useSelector } from "react-redux";
import Head from "next/head";

function AboutUs() {
  const { showChatDialog } = useSelector((state) => state.chatSlice);

  const Principles = ({ serialNumber, title, description }) => {
    return (
      <div className="text-white py-16  l:px-8 border-t border-t-[#30303D]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex items-center gap-24 max-xl:gap-4">
            <p className="text-xl font-semibold xl:mb-2 text-[#AAAAAA] ">
              {serialNumber}
            </p>
            <h2 className="text-5xl text-white font-bold leading-tight max-xl:text-xl">
              {title}
            </h2>
          </div>
          <div className="md:col-span-1">
            <p className="text-base sm:text-lg font-regular leading-relaxed text-white">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#00000D] overflow-hidden">
      <Head>
        <title>About Us | The Phi</title>
        <meta name="description" content="We are more than just a Team, We are a Vision. Spreading happiness through digital design and engineering excellence." />
        <meta property="og:title" content="About Us | The Phi" />
        <meta property="og:description" content="We are more than just a Team, We are a Vision. Spreading happiness through digital design and engineering excellence." />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <div className="px-[60px] max-xl:px-6 ">
        <div className="relative ">
          <div
            data-aos="zoom-in-left"
            className="absolute bottom-20 -left-200 max-xl:-left-50 w-full h-1/2 radial"
          />
          <div
            data-aos="zoom-in-right"
            className="absolute bottom-40 -right-40 w-1/2 h-1/2 moveRadial "
          />

          <div className=" flex flex-col py-30 max-lg:pb-14 items-start  xl:min-h-[80%]">
            <h1
              className="font-bold text-[96px] max-xl:text-[40px] max-lg:text-[36px] text-start text-white xl:w-250"

            >
              <span className="max-lg:hidden">
                <ReactFitty
                  className="max-lg:hidden"
                  maxSize={96}
                  key={showChatDialog}
                >
                  Spreading Happiness
                  <br /> through Digital Design
                </ReactFitty>
              </span>
              <span className="hidden max-lg:block">
                Spreading Happiness
                <br /> through Digital Design
              </span>

            </h1>
          </div>
        </div>
        <div className="flex flex-col space-y-12">
          <div>
            <TextFadeUpScroll
              className="text-base font-regular   tracking-widest text-white"
              text={`Who We Are`}
            />
            <TextFadeUpScroll
              className="font-semibold text-[48px] text-white"
              text={`We are more than just a Team, We are a Vision`}
            />
          </div>
          <main className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-24">
            <div className="space-y-12">
              <div className="grid grid-cols-2 gap-6 max-xl:flex max-xl:flex-col-reverse">
                <div className="relative overflow-hidden rounded-xl ">
                  <div className="flex flex-col space-y-6">
                    <Image
                      width={0}
                      height={0}
                      src="/images/about/1.jpg"
                      alt="A smiling man with glasses"
                      className="inset-0 h-100 w-full object-cover rounded-xl"
                    />
                    <div
                      className="min-h-40 p-5 flex flex-col justify-between h-full rounded-2xl shadow-lg border-1 border-[#444444]
                      inset-0 
                      bg-[linear-gradient(60deg,#54B98F8A_0%,#54B98F00_90%,#54B98F00_45%)]
                      gap-[80px]
 "
                    >
                      <p className="text-base font-regular   tracking-widest text-white">
                        Number of Projects
                      </p>
                      <p className="text-6xl md:text-7xl font-extrabold mt-2 text-white">
                        50+
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-xl ">
                  <div className="flex flex-col space-y-6">
                    <div
                      className="min-h-40 p-5 flex flex-col justify-between h-full rounded-2xl shadow-lg border-1 border-[#444444]
                      inset-0
                       
                      bg-[linear-gradient(60deg,#FF77368A_0%,#FF773600_90%,#FF773600_54%)] 
                      gap-[80px]
 "
                    >
                      <p className="text-base font-regular   tracking-widest text-white">
                        Successful Deliveries
                      </p>
                      <p className="text-6xl md:text-7xl font-extrabold mt-2 text-white">
                        99%
                      </p>
                    </div>

                    <Image
                      width={0}
                      height={0}
                      src="/images/about/2.jpg"
                      alt="A smiling man with glasses"
                      className="inset-0 w-full h-100 object-cover rounded-xl max-xl:hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Descriptive Text Section */}
            <div className="lg:sticky top-20   flex flex-col justify-start space-y-8 sticky   h-fit">
              <div>
                <TextFadeUpScroll
                  className="text-2xl font-semibold mb-4 text-white"
                  text={`Together, We Build Stories that matter in the Digital World`}
                />
                <TextFadeUpScroll
                  className="text-base text-[#A3A3A3]"
                  text={`We are a collective of thinkers, dreamers, and doers who believe in the power of design to create positive change. We are not just designers. Our purpose is rooted in a passion and guided by a vision to bring ideas to life. We are a team of problem-solvers that truly connect with people. Every project we take on is more than just a task it's a journey. We don't just create, we breathe life, and a purpose to deliver excellence.`}
                />

                <TextFadeUpScroll
                  className="mt-4 text-base text-gray-400"
                  text={`We dont just build products, we build platforms. We build relationships, we create, and opportunities that have a lasting impact. Our approach is to foster a culture of open-ended collaboration, and we always respect to shape what matters most.`}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      <div className="mb-12 mt-20  border-y border-y-[#30303D] py-2">
        <TextCarousel />
      </div>

      <div className="  z-2 relative overflow-visible max-xl:overflow-hidden  bg-[#00000D] ">
        <div className="moveRadial animate xl:-top-20 max-xl:-top-0 xl:left-[40%] left-[14%] h-full min-w-80 max-w-full" />
        <div className="radial animate absolute z-10 xl:-top-3 max-xl:-top-0 min-h-full min-w-2/3   max-w-full" />

        <div className="flex flex-col bg-[#00000D] ">
          <div className="glassWrapper relative z-20">
            <div className="glassStrip  " />

            <div className=" px-16 max-xl:px-6     text-white">
              <div className="flex min-h-screen items-start justify-center    text-white">

                <div className=" mx-auto w-full   max-xl:mt-12 ">
                  <div className="xl:mb-20 mb-12 gap-[20px] flex flex-col">
                    <TextFadeUpScroll
                      text={"Why Choose Us"}
                      className="mt-4 max-w-5xl text-lg text-white text-regular"
                    />
                    <TextFadeUpScroll
                      text={
                        "The Promise of Quality, Commitment, and Lasting Results"
                      }
                      className="text-5xl font-medium leading-normal  max-w-220  max-xl:text-3xl"
                    />
                  </div>

                  <Principles
                    serialNumber={"01."}
                    title={"Our Principles"}
                    description={
                      "With years of hands-on experience across diverse industries, we bring not only deep knowledge but also the wisdom and insight that come from solving real challenges. Our refined skills and proven methodologies allow us to approach every project with clarity, creativity, and confidence. Each solution we deliver is crafted with precision, strengthened by expertise, and backed by a strong foundation of trust and measurable success."
                    }
                  />
                  <Principles
                    serialNumber={"02."}
                    title={"Methodology"}
                    description={
                      "At the core of everything we do is an unwavering focus on our clients. We believe that true success begins with understanding your vision, your challenges, and your aspirations. By listening closely and working alongside you, we transform ideas into solutions that are not only effective but deeply aligned with your goals. Every decision we make, every detail we refine, and every strategy we design is centered around your needs, ensuring that our journey together is built on trust, collaboration, and lasting results."
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8" />

      <Footer />
    </div>
  );
}

export default AboutUs;
