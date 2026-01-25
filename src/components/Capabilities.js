import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import GradientButton from "./GradientButton";
import TextFadeUpScroll from "./animations/TextFadeUpScroll";
import { useRouter } from "next/router";
import { getSanityImageUrl } from "../../lib/sanity";

// Main App component
export default function Capabilities({ services: initialServices = [] }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [capabilities, setCapabilities] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Transform services data into capabilities format
    // Each service has: title, items[] where items have icon
    // We use service.title as text and first item's icon as image
    if (initialServices && initialServices.length > 0) {
      const transformed = initialServices.map((service) => ({
        text: service.title,
        image: service.image,
        // Get the first item's icon, if available

        // Include all items for the sidebar
        items: service.items || [],
      }));
      setCapabilities(transformed);
    }
  }, [initialServices]);

  return (
    <div className="glassWrapper    flex flex-col  z-1">
      <div className="glassStrip" />

      <div className="  px-16 max-xl:px-6  ">
        <div className="flex min-h-screen items-start justify-center    text-white">
          <div className=" mx-auto w-full    ">
            <div className="mb-20">
              <h1 className="text-5xl font-medium   max-xl:text-3xl">
                Our Capabilities
              </h1>
              <p className="mt-4 max-w-5xl text-lg text-[#AAAAAA]">
                We promise to transform your customer journey from the ground
                up. With a deep understanding of your brand and an innovative
                approach.
              </p>
            </div>

            <div className="flex flex-col md:flex-row    w-full justify-between">
              <ul className="  z-10 space-y-8 md:space-y-12">
                {capabilities.map((item, index) => (
                  <motion.li
                    whileHover={{ marginLeft: 60 }}
                    key={index}
                    className="group relative cursor-pointer"
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <h2 className=" font-medium leading-snug text-[64px] max-xl:text-[36px]">
                      {item.text.split("\n").map((line, lineIndex) => (
                        <span key={lineIndex} className="block">
                          <TextFadeUpScroll text={line} />
                        </span>
                      ))}
                    </h2>


                    <div className="max-xl:hidden pointer-events-none">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                          opacity: hoveredItem === item ? 1 : 0,
                          x: hoveredItem === item ? 0 : 20
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-[28rem] md:w-[14rem]"
                      >
                        {item.image && (
                          <Image
                            width={300}
                            height={300}
                            src={getSanityImageUrl(item.image)}
                            alt={item.text}
                            className="pointer-events-none z-10 h-[200px] w-[250px] select-none rounded-xl object-cover shadow-xl"
                          />
                        )}
                      </motion.div>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div className="hidden pt-10 text-left md:block  min-w-50   sticky top-0  h-fit">
                <AnimatePresence mode="wait">
                  {hoveredItem && hoveredItem.items && hoveredItem.items.length > 0 ? (
                    <motion.ul
                      key={hoveredItem.text}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2 text-[12px] text-white"
                    >
                      {hoveredItem.items.map((item, idx) => (
                        <li key={idx}>{item.title?.toUpperCase() || item.id}</li>
                      ))}
                    </motion.ul>
                  ) : (
                    <motion.ul
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="-space-y-0 text-[12px] text-white/50"
                    >
                      <li>HOVER TO SEE</li>
                      <li>SERVICE ITEMS</li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-20" onClick={() => router.push('/services')}>
          <GradientButton />
        </div>
      </div>
    </div>
  );
}
