import React, { useEffect, useRef, useState } from "react";
import MemoizedCard from "./StackCard";
import TextFadeUpScroll from "./animations/TextFadeUpScroll";

const ScrollStack = ({
  cards,
  sectionHeightMultiplier = 1.5,
  className = "",
}) => {
  const scrollableSectionRef = useRef(null);

  const cardsContainerRef = useRef(null);
  const ticking = useRef(false);
  const scrollProgress = useRef(0);
  const cardCount = Math.min(cards.length, 3);

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const sectionRef = useRef(null);
  const glassStripRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          if (!sectionRef.current || !scrollableSectionRef.current) {
            ticking.current = false;
            return;
          }

          // Get the parent container's position relative to viewport
          const containerRect = scrollableSectionRef.current.getBoundingClientRect();

          // How much the container has scrolled past the top
          const scrollDistance = -containerRect.top;

          // 100px buffer - animation starts only after scrolling 100px into the section
          const buffer = 0;

          // Only start counting progress after the buffer distance
          const scrollOffset = Math.max(0, scrollDistance - buffer);

          // The total scrollable distance for this section (adjusted for buffer)
          const totalDistance =
            sectionRef.current.offsetHeight - window.innerHeight - buffer;

          // Calculate progress based on the scroll offset and total distance
          let progress = 0;
          if (totalDistance > 0 && scrollOffset > 0) {
            progress = Math.min(scrollOffset / totalDistance, 1);
          }

          scrollProgress.current = progress;

          const newActiveIndex = Math.min(
            Math.floor(progress * cardCount),
            cardCount - 1
          );
          if (newActiveIndex !== activeCardIndex) {
            setActiveCardIndex(newActiveIndex);
          }

          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // Listen to window scroll instead of container scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cardCount, activeCardIndex]);

  return (
    <div
      ref={scrollableSectionRef}
      className="glassWrapper relative z-20 w-full  max-lg:hidden"
    >
      <div ref={glassStripRef} className="glassStrip " />

      <div
        ref={sectionRef}
        className={`relative   w-full    `}
        // style={{ height: '300vh' }}
        style={{ height: `${sectionHeightMultiplier * 100}vh` }}
      >
        <div
          className=" max-xl:px-6 max-xl:pt-0 
              sticky top-0 w-full min-h-screen flex items-start   justify-between overflow-hidden max-xl:overflow-visible"
        >
          <div className="  max-xl:pt-12   xl:px-12 flex max-xl:flex-col  w-full justify-between   gap-8 ">
            <div className="flex flex-col justify-center text-white   max-w-150">
              <p className="text-base   tracking-wider text-white font-regular mb-2">
                Testimonials
              </p>
              <h2 className="text-[40px] max-xl:text-[30px] font-medium leading-tight mb-6 max-xl:mt-6">
                How Our Clients Achieved Growth Through Digital Transformation
              </h2>
              <TextFadeUpScroll
                className="text-lg text-gray-300 flex items-start t mt-8 text-[#AAAAAA]"
                text={`From startups to established enterprises, our commitment to delivering exceptional results has earned us their confidence and loyalty.`}
              />
            </div>

            {/* Card container - needs relative positioning and min-height for absolute cards */}
            <div
              ref={cardsContainerRef}
              className="relative w-full max-w-lg mx-auto  min-h-[350px] max-xl:min-h-[380px]"
            >
              {cards.slice(0, cardCount).map((card, index) => (
                <MemoizedCard
                  key={index}
                  card={card}
                  enableScroll={true}
                  index={index}
                  scrollProgress={scrollProgress}
                  activeCardIndex={activeCardIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollStack;
