import React, { useCallback, useEffect, useState, useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import stepperImage from "@/../public/images/stepper.png";
import { motion } from "framer-motion";
import TextFadeUpScroll from "./animations/TextFadeUpScroll";

// The main Steps to Success component
function Stepper() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Data for each step
  const stepsData = useMemo(() => [
    {
      title: "Discover & Understand",
      description:
        "We begin by listening to your vision, studying your challenges, and understanding your goals. This helps us uncover opportunities and set the right foundation.",
      image: '/images/stepper/discover.jpg',
      // "https://placehold.co/800x800/d9a896/000000?text=Discover",
    },
    {
      title: "Strategize & Plan",
      description:
        "Based on our understanding, we develop a comprehensive strategy and a detailed plan. This roadmap outlines the key actions and milestones for your project's success.",
      // image: "https://placehold.co/800x800/a29283/000000?text=Strategize",
      image: '/images/stepper/stratergy.jpg',
    },
    {
      title: "Build & Innovate",
      description:
        "Our team of experts begins the development process, bringing your vision to life with precision and creativity. We focus on building a robust and innovative solution.",
      // image: "https://placehold.co/800x800/7c706c/000000?text=Build",
      image: '/images/stepper/build.jpg',
    },
    {
      title: "Launch & Optimize",
      description:
        "After rigorous testing, we launch your solution. Our work doesn't stop there; we continuously monitor, gather feedback, and optimize to ensure long-term performance and growth.",
      // image: "https://placehold.co/800x800/615a57/000000?text=Launch",
      image: '/images/stepper/launch.jpg',
    },
  ], []);

  // Handler for the previous button
  const handlePrev = useCallback(() => {
    setCurrentStepIndex(
      (prevIndex) => (prevIndex - 1 + stepsData.length) % stepsData.length
    );
  }, [stepsData]);

  // Handler for the next button
  const handleNext = useCallback(() => {
    setCurrentStepIndex((prevIndex) => (prevIndex + 1) % stepsData.length);
  }, [stepsData]);

  // Auto-advance logic: Resets timer on every step change (user or auto)
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 4500); // Smooth 4.5s transition time

    return () => clearTimeout(timer);
  }, [handleNext, currentStepIndex]);

  const currentStep = stepsData[currentStepIndex];
  const progressWidth =
    Math.min((currentStepIndex / (stepsData.length - 1)) * 100 + 12, 100) || 20;

  const NavButtons = () => {
    return (
      <div className="flex space-x-4 max-xl:space-x-8">
        <button
          onClick={handlePrev}
          className="p-4 cursor-pointer rounded-xl border border-[#444444]  transition-colors"
          aria-label="Previous step"
        >
          <ArrowLeft size={24} color="#FF773C" />
        </button>
        <button
          onClick={handleNext}
          className="p-4 cursor-pointer rounded-xl border border-[#444444]  0 transition-colors"
          aria-label="Next step"
        >
          <ArrowRight size={24} color="#FF773C" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-scree   text-white flex flex-col justify-center items-center p-8 px-0">
      <div className="  w-full mx-auto max-xl:px-6 xl:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3   gap-18">
          <div className="flex flex-col mb-8 lg:mb-0">
            <div className="space-y-[30px]">
              <h1 className="text-5xl font-medium  ">Steps to Success</h1>
              <p className="text-gray-400 text-lg sm:text-xl max-w-md ">
                Our step-by-step approach is designed to turn your vision into a
                tangible reality.
              </p>
              <div className="max-xl:hidden">
                <NavButtons />
              </div>
            </div>
          </div>



          <div className="flex justify-center items-center">
            <div className="relative w-full aspect-square overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={currentStep.image}
                alt={`Visual for ${currentStep.title}`}
                fill
                className="object-cover transition-transform duration-500 ease-in-out transform scale-100 hover:scale-105"
              />
            </div>
          </div>


          <div
            key={currentStepIndex}
            className="relative z-2 w-full h-full flex flex-col justify-center p-4 pt-0 gap-[30px]"
          >
            <div className="gap-[15px] flex flex-col">
              <div className="flex gap-3 items-center">
                <motion.div
                  className="bg-[#484848] rounded-full h-2 w-2"
                  initial={{ opacity: 0, y: 40 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileInView={{ opacity: 1, y: 0 }}
                />
                <TextFadeUpScroll
                  className="text-base font-regular text-[#AAAAAA]"
                  text={`Step ${currentStepIndex + 1}`}
                />
              </div>
              <TextFadeUpScroll
                className="text-base font-medium !text-[40px] leading-tight mb-4 text-white"
                text={currentStep.title}
              />
            </div>
            <TextFadeUpScroll
              className="text-gray-300 text-base   leading-relaxed"
              text={currentStep.description.toString()}
              delay={0.4}
            />
          </div>
        </div>

        <div className="w-full  rounded-lg ">
          <div className="mt-24 w-full relative">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#AAAAAA] -translate-y-1/2 rounded-full"></div>

            <motion.div
              className="absolute top-1/2 left-0 bg-orange-500 h-[2px] -translate-y-1/2 rounded-full"
              animate={{ width: `${progressWidth}%` }}
              transition={{
                duration: 2, // slower & smoother
                ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
              }}
            />

            <div className="relative flex justify-around">
              {stepsData.map((_, index) => {
                const isCurrent = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;
                const isActive = index <= currentStepIndex;

                return (
                  <div
                    key={index}
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => setCurrentStepIndex(index)}
                  >
                    <p
                      className={`absolute -top-8 text-sm transition-colors duration-300 whitespace-nowrap
                      ${isCurrent ? "!text-[#FF773C] font-medium" : "text-white"
                        }
                    `}
                    >
                      {`Step ` + (index + 1)}
                    </p>
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center   duration-300
                      ${isActive
                          ? " border-2  border-[#FF773C]"
                          : "bg-[#AAAAAA]"
                        }
                      ${isCompleted ? "bg-[#FF773C]" : ""}
                    `}
                    >
                      {isCurrent && (
                        <div className="w-2 h-2 rounded-full bg-[#FF773C]"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="xl:hidden">
        <NavButtons />
      </div>
    </div>
  );
}

export default Stepper;
