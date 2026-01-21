import TextFadeUpScroll from "@/components/animations/TextFadeUpScroll";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTouchTop } from "@/hooks/useTouchTop";
import { getServices } from "../../../lib/serviceUtils";
import { getSanityImageUrl } from "../../../lib/sanity";
import Head from "next/head";

// sectionsData is now fetched from Sanity

function HeroSection() {
  return (
    <section className="w-full bg-black text-white">
      <div className="relative overflow-hidden">
        {/* Left Teal Radial */}
        <div className="absolute -left-20 top-20 w-[600px] h-[600px] bg-[#00FFD1]/10 blur-[120px] rounded-full pointer-events-none z-0" />

        {/* Right Orange Radial */}
        <div className=" moveRadial animate
        absolute -right-40 bottom-0 w-[1000px] h-[1000px] bg-[#FF773C]/15 blur-[150px] rounded-full pointer-events-none z-0" />

        <div className="flex flex-col max-xl:flex-col-reverse p-8 max-xl:p-6 xl:px-16 relative z-10">
          <div className="text-left max-w-xl  ml-auto text-sm leading-relaxed">
            <TextFadeUpScroll
              className="text-white text-xl max-xl:text-base font-regular text-end max-xl:my-4"
              text={`We believe that every challenge deserves a fresh perspective and every solution should create real impact. By combining creativity with cutting-edge technology, we ensure our services go beyond the ordinary, offering smarter, faster, and more meaningful outcomes.`}
            />
          </div>
          <h1>
            <TextFadeUpScroll
              className="text-[75px] max-xl:text-[30px] max-lg:mt-20 font-medium max-w-4xl leading-snug text-white"
              text={`Innovation\nThrough Every Service\nWe Provide`}
            />
          </h1>
        </div>
      </div>
      <div className="relative w-full h-[670px]">
        <Image
          width={0}
          height={0}
          src="https://evolveiqtech.com/wp-content/uploads/2023/02/project07-1-768x457.jpg"
          alt="Team working"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-6xl max-xl:ml-4  ml-12 h-full flex flex-col justify-between py-12">
          <TextFadeUpScroll
            className="text-[96px] max-xl:text-[36px] absolute bottom-12  font-semibold leading-snug text-white"
            text={`See  How  We  Shape\nthe  Digital  World`}
          />
        </div>
      </div>
    </section>
  );
}

function DesignPrinciples({ section, index, activeIndex, setActiveIndex }) {
  const { ref, touched } = useTouchTop(150);

  const showDetails = touched;

  useEffect(() => {
    if (touched) {
      setActiveIndex(index);
    } else if (activeIndex === index) {
      setActiveIndex(-1);
    }
  }, [touched, index, setActiveIndex, activeIndex]);

  // Variants for the container that holds the cards
  // Using max-height instead of height: auto to prevent layout shift feedback loop
  const containerVariants = {
    hidden: {
      opacity: 0,
      maxHeight: 0,
      overflow: "hidden",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    visible: {
      opacity: 1,
      maxHeight: 500, // Fixed max height to prevent layout recalculation
      overflow: "visible",
      transition: {
        duration: 0.4,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  // Variants for the individual cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15, // Add a bit more damping to prevent the bounce from being too harsh
      },
    },
  };

  return (
    <div ref={ref} className="border-t border-t-[#30303D] ">
      <div>
        <TextFadeUpScroll
          className="text-[48px] font-medium text-white py-4 cursor-pointer"
          text={section.title}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={showDetails ? "visible" : "hidden"}
        className="w-full"
      >
        <div className="flex flex-row overflow-x-auto w-full max-w-full flex-nowrap gap-6 max-xl:gap-4 pb-4 px-1 scrollbar-hide">
          {section.items.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="flex-shrink-0 w-[280px] xl:w-[320px] p-6 my-2
                  bg-[rgba(255,255,255,0.1)] border-2 border-[rgba(72,72,72,0.5)] shadow-[0_0_25px_rgba(0,0,0,0.1)] rounded-[20px] box-border"
            >
              <div className="text-base mb-2 flex gap-2">
                <span className=" italic font-regular text-[#AAAAAA]">
                  {item.id}
                </span>
                <span className="text-white font-medium text-2xl">
                  {item.title}
                </span>
              </div>
              <div className="text-[80px] mb-4 flex items-center justify-center">
                {item.icon ? (
                  <Image
                    src={getSanityImageUrl(item.icon) || "/images/placeholder.png"}
                    alt={item.title || "Service Icon"}
                    className="w-40 h-40 object-contain"
                    width={160}
                    height={160}
                  />
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center bg-white/5 rounded-full">
                    <span className="text-4xl opacity-20">?</span>
                  </div>
                )}
              </div>
              <p className="text-white font-regular text-base whitespace-normal">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Index({ sectionsData }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const capabilitiesRef = useRef(null);
  const [radialStyle, setRadialStyle] = useState({
    opacity: 0,
    top: "50%",
    transform: "translate(-50%, -50%)",
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!capabilitiesRef.current) return;

      const rect = capabilitiesRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate when section enters and exits viewport
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const sectionHeight = rect.height;

      // Check if section is in viewport
      const isInViewport = sectionTop < viewportHeight && sectionBottom > 0;

      if (!isInViewport) {
        setRadialStyle({
          opacity: 0,
          top: "50vh",
          transform: "translate(-50%, -50%)",
        });
        return;
      }

      // Calculate fade based on distance from viewport edges
      const distanceFromTop = Math.max(0, -sectionTop);
      const distanceFromBottom = Math.max(0, sectionBottom - viewportHeight);

      // Fade in when entering (first 300px)
      // Fade out when exiting (last 300px)
      const fadeDistance = 300;
      let opacity = 1;

      if (sectionTop > 0 && sectionTop < fadeDistance) {
        // Fading in from top
        opacity = 1 - (sectionTop / fadeDistance);
      } else if (sectionBottom < viewportHeight && (viewportHeight - sectionBottom) < fadeDistance) {
        // Fading out from bottom
        opacity = 1 - ((viewportHeight - sectionBottom) / fadeDistance);
      }

      setRadialStyle({
        opacity: activeIndex !== -1 ? opacity : 0,
        transform: "translate(-50%, -50%)",
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeIndex]);

  return (
    <div className="bg-[#00000D]    ">
      <Head>
        <title>Our Services | The Phi</title>
        <meta name="description" content="Discover our innovative digital solutions. From intuitive user experiences to immersive platforms and AI-driven transformation." />
        <meta property="og:title" content="Our Services | The Phi" />
        <meta property="og:description" content="Discover our innovative digital solutions. From intuitive user experiences to immersive platforms and AI-driven transformation." />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <div className="overflow-hidden xl:pt-24">
        <HeroSection />
      </div>

      <div className="relative">
        <div className="flex relative  flex-col">
          {/* Interactive Radial that is absolute within the services section */}
          <motion.div
            className="radial animate absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none h-2/3 xl:w-180 w-60 top-1/4"
            style={radialStyle}
            transition={{ opacity: { duration: 0.3 } }}
          />
          <div className=" py-16 px-6 ">
            <div className="max-xl:flex-col-reverse flex flex-col">
              <div className="w-full flex justify-end ">
                <p className="text-white text-xl font-regular max-w-2xl leading-relaxed text-start xl:text-end">
                  From designing intuitive user experiences and building
                  immersive digital platforms to harnessing the power of A.I.,
                  machine learning, and mobile innovation, our capabilities span
                  the full spectrum of digital transformation.
                </p>
              </div>

              <h3 className="text-3xl text-white font-semibold mb-6">Capabilities</h3>
            </div>
          </div>
          <div ref={capabilitiesRef} className="pb-20 text-white p-10 max-xl:p-6 min-h-screen">
            {sectionsData && sectionsData.length > 0 ? (
              sectionsData
                .map((section, idx) => (
                  <DesignPrinciples
                    section={section}
                    key={idx}
                    index={idx}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                  />
                ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-white/50">
                <p>No services found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const sectionsData = await getServices();
    return {
      props: {
        sectionsData,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    return {
      props: {
        sectionsData: [],
      },
    };
  }
}

export default Index;
